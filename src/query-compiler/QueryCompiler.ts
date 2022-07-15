import { CompiledQuery } from './CompiledQuery';
import { DatabaseValue } from '../shared/DatabaseValue';
import { QueryProperties } from '../query-builder/QueryProperties';
import { WhereType } from '../query-builder/WhereType';
import { QueryType } from '../query-builder/QueryType';
import { ExpressionValues } from '../query-builder/ExpressionValues';

/**
 * Compile SQL query based on QueryProperties
 */
export class QueryCompiler {
  /**
   * Array of variables for parameterized SQL query
   */
  private variables: DatabaseValue[] = [];

  constructor(private readonly properties: QueryProperties) {}

  /**
   * Compile query based on QueryProperties
   */
  public compile(): CompiledQuery {
    const { type } = this.properties;

    if (type === QueryType.Select) {
      const statement = this.select();

      return new CompiledQuery(statement, this.variables);
    }
  }

  /**
   * Compile SQL SELECT statement
   */
  private select(): string {
    const base = `${QueryType.Select} * FROM ${this.properties.table}`;

    const statements: string[] = [base];

    if (this.properties.wheres.length) {
      const where = this.where();

      statements.push(where);
    }

    if (this.properties.limit >= 0) {
      const limit = this.limit();

      statements.push(limit);
    }

    if (this.properties.offset >= 0) {
      const offset = this.offset();

      statements.push(offset);
    }

    const statement = statements.join(' ');

    return statement;
  }

  /**
   * Compile SQL WHERE clause */
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
   * Compile query expression
   *
   * Example: 'uuid = :uuid' => 'uuid = $1'
   */
  private expression(expression: string, values: ExpressionValues): string {
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
      compiledExpression += `$${this.variables.length}`;
    }

    return compiledExpression;
  }
}
