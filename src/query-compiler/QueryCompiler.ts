import { CompiledQuery } from './CompiledQuery';
import { DatabaseValue } from '../shared/DatabaseValue';
import { QueryProperties } from '../query-builder/QueryProperties';
import { WhereType } from '../query-builder/WhereType';
import { QueryType } from '../query-builder/QueryType';
import { ValuesObject } from '../shared/ValuesObject';
import { DatabaseDialect } from '../connection/DatabaseDialect';
import { JoinType } from 'src/query-builder/JoinType';

/**
 * Compile SQL query based on QueryProperties
 */
export class QueryCompiler {
  /**
   * Array of variables for parameterized SQL query
   */
  private variables: DatabaseValue[] = [];

  constructor(
    private readonly dialect: DatabaseDialect,
    private readonly properties: QueryProperties,
  ) {}

  /**
   * Compile query based on QueryProperties
   */
  public compile(): CompiledQuery {
    const { type } = this.properties;

    let statement = '';

    switch (type) {
      case QueryType.Select: {
        statement = this.select();

        break;
      }
      case QueryType.Insert: {
        statement = this.insert();

        break;
      }
      case QueryType.Update: {
        statement = this.update();

        break;
      }
      case QueryType.Delete: {
        statement = this.delete();

        break;
      }
      default: {
        throw new Error('Incorrect query type');
      }
    }

    const compiledQuery = new CompiledQuery(statement, this.variables);

    return compiledQuery;
  }

  /**
   * Compile SQL SELECT statement
   */
  private select(): string {
    const base = `${QueryType.Select} * FROM ${this.properties.table}`;

    const statements: string[] = [base];

    if (this.properties.limit >= 0) {
      const limit = this.limit();

      statements.push(limit);
    }

    if (this.properties.offset >= 0) {
      const offset = this.offset();

      statements.push(offset);
    }

    if (this.properties.joins.length) {
      const joins = this.join();

      statements.push(joins);
    }

    if (this.properties.wheres.length) {
      const wheres = this.where();

      statements.push(wheres);
    }

    const statement = statements.join(' ');

    return statement;
  }

  /**
   * Compile SQL INSERT statement
   */
  private insert(): string {
    const base = `INSERT INTO ${this.properties.table}`;

    const statements: string[] = [base];

    const valuesObjectHasProperties =
      Object.keys(this.properties.values).length > 0;

    if (!valuesObjectHasProperties) {
      throw new Error(
        'You have passed an empty values object, use .values() method of the query builder',
      );
    }

    const values = this.values();
    statements.push(values);

    if (this.properties.returning.length) {
      const returning = this.returning();

      statements.push(returning);
    }

    const statement = statements.join(' ');

    return statement;
  }

  /**
   * Compile SQL UPDATE statement
   */
  private update(): string {
    const base = `UPDATE ${this.properties.table} SET`;

    const statements: string[] = [base];

    const setObjectHasProperties = Object.keys(this.properties.set).length > 0;

    if (!setObjectHasProperties) {
      throw new Error(
        'You have passed an empty set object, use .set() method of the query builder',
      );
    }

    const set = this.set();
    statements.push(set);

    if (!this.properties.wheres.length) {
      throw new Error(
        'You have passed an empty where object, use any of where methods of the query builder',
      );
    }

    const where = this.where();
    statements.push(where);

    if (this.properties.returning.length) {
      const returning = this.returning();

      statements.push(returning);
    }

    const statement = statements.join(' ');

    return statement;
  }

  /**
   * Compile SQL DELETE statement
   */
  private delete(): string {
    const base = `DELETE FROM ${this.properties.table}`;

    const statements: string[] = [base];

    if (this.properties.wheres.length) {
      const where = this.where();

      statements.push(where);
    }

    const statement = statements.join(' ');

    return statement;
  }

  /**
   * Compile SQL WHERE clause
   */
  private where(): string {
    const base = 'WHERE';

    const statements: string[] = [base];

    for (let i = 0; i < this.properties.wheres.length; i++) {
      const { type, expression, values } = this.properties.wheres[i];

      let statement = '';

      if (type !== WhereType.Default && i > 0) {
        statement += `${type} `;
      }

      statement += `${this.expression(expression, values)}`;

      statements.push(statement);
    }

    const statement = statements.join(' ');

    return statement;
  }

  /**
   * Compile SQL LIMIT clause
   */
  private limit(): string {
    const statement = `LIMIT ${this.properties.limit}`;

    return statement;
  }

  /**
   * Compile SQL OFFSET clause
   */
  private offset(): string {
    const statement = `OFFSET ${this.properties.offset}`;

    return statement;
  }

  /**
   * Compile SQL RETURNING clause
   */
  private returning(): string {
    const statement = `RETURNING ${this.properties.returning}`;

    return statement;
  }

  /**
   * Compile fields and values for INSERT query
   *
   * Example: { name: 'Mary', age: 18 } => '(name, age) VALUES ($1, $2)'
   */
  private values(): string {
    const valuesObject = this.properties.values;

    const fields: string[] = [];
    const values: string[] = [];

    for (const key in valuesObject) {
      const value = valuesObject[key];

      fields.push(key);
      this.variables.push(value);
      values.push(this.placeholder());
    }

    const compiledFields = fields.join(',');
    const compiledValues = values.join(',');

    const statement = `(${compiledFields}) VALUES (${compiledValues})`;

    return statement;
  }

  /**
   * Compile set values for UPDATE query
   *
   * Example: { name: 'Mary' } => 'name = $1'
   */
  private set(): string {
    const setObject = this.properties.set;

    const statements: string[] = [];

    for (const key in setObject) {
      const value = setObject[key];

      this.variables.push(value);
      statements.push(`${key} = ${this.placeholder()}`);
    }

    const statement = statements.join(',');

    return statement;
  }

  /**
   * Compile SQL JOIN clause
   */
  private join(): string {
    const statements: string[] = [];

    for (const join of this.properties.joins) {
      const { type, table, expression } = join;

      const statement = `${JoinType[type]} ${table} ON ${expression}`;

      statements.push(statement);
    }

    const statement = statements.join(' ');

    return statement;
  }

  /**
   * Compile query expression
   *
   * Example: 'uuid = :uuid' => 'uuid = $1'
   */
  private expression(expression: string, values: ValuesObject): string {
    const length = expression.length;

    let compiledExpression = '';

    for (let i = 0; i < length; i++) {
      const char = expression[i];

      if (char !== ':') {
        compiledExpression += char;

        continue;
      }

      let key = '';

      while (++i < length && expression[i] !== ' ') {
        key += expression[i];
      }

      const value = values[key];

      if (!value) {
        throw new Error('There in no value under this name');
      }

      this.variables.push(value);
      compiledExpression += this.placeholder();
    }

    return compiledExpression;
  }

  private placeholder(): string {
    let placeholder = '';

    switch (this.dialect) {
      case 'postgres': {
        placeholder = `$${this.variables.length}`;

        break;
      }
      case 'mysql': {
        placeholder = '?';

        break;
      }
      case 'sqlite': {
        placeholder = '?';

        break;
      }
      default: {
        throw new Error('Unknown database dialect');
      }
    }

    return placeholder;
  }
}
