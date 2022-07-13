import { CompiledQuery } from './CompiledQuery';
import { DatabaseValue } from '../shared/DatabaseValue';
import { QueryProperties } from '../query-builder/QueryProperties';
import { WhereType } from '../query-builder/WhereType';
import { QueryType } from '../query-builder/QueryType';

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

    const statements = [base];

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
    const statements: string[] = ['WHERE'];

    for (let i = 0; i < this.properties.wheres.length; i++) {
      const { type, column, expression } = this.properties.wheres[i];

      let statement = '';

      if (type !== WhereType.Default && i > 0) {
        statement += `${type} `;
      }

      statement += `${column} ${expression.operator} $${this.variables.length}`;

      statements.push(statement);
      this.variables.push(expression.value);
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
}
