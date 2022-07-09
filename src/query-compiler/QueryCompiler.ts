import { CompiledQuery } from './CompiledQuery';
import { DatabaseValue } from '../shared/DatabaseValue';
import { QueryProperties } from '../query-builder/QueryProperties';
import { WhereType } from '../query-builder/WhereType';

/**
 * Compile SQL query based on QueryProperties
 */
export class QueryCompiler {
  private variables: DatabaseValue[] = [];

  constructor(private readonly properties: QueryProperties) {}

  public compile(): CompiledQuery {}

  /**
   * Compile SQL WHERE clause
   */
  private compileWhereClause() {
    const statements: string[] = [];

    for (let i = 0; i < this.properties.wheres.length; i++) {
      const { type, column, expression } = this.properties.wheres[i];

      let statement = '';

      if (type !== WhereType.Default && i > 0) {
        statement += type + ' ';
      }

      const compiledExpression = expression.compile();
      statement += column + ' ' + compiledExpression;

      statements.push(statement);
    }

    const statement = 'WHERE ' + statements.join(' ');

    return statement;
  }
}
