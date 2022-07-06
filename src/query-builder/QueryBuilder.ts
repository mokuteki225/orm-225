import { QueryProperties } from './QueryProperties';
import { QueryExpression } from './QueryExpression';
import { WhereClause } from './WhereClause';
import { WhereType } from './WhereType';

/**
 * Class which is responsible for building the query
 */
export class QueryBuilder {
  private properties: QueryProperties;

  constructor() {
    this.properties = new QueryProperties();
  }

  /**
   * Add WHERE clause to properties array
   */
  public where(column: string, expression: QueryExpression): QueryBuilder {
    const where: WhereClause = {
      column,
      expression,
      type: WhereType.Default,
    };

    this.properties.wheres.push(where);

    return this;
  }

  /**
   * Add AND WHERE clause to properties array
   */
  public andWhere(column: string, expression: QueryExpression): QueryBuilder {
    const where: WhereClause = {
      column,
      expression,
      type: WhereType.And,
    };

    this.properties.wheres.push(where);

    return this;
  }

  /**
   * Add OR WHERE clause to properties array
   */
  public orWhere(column: string, expression: QueryExpression): QueryBuilder {
    const where: WhereClause = {
      column,
      expression,
      type: WhereType.Or,
    };

    this.properties.wheres.push(where);

    return this;
  }

  /**
   * Add WHERE NOT clause to properties array
   */
  public whereNot(column: string, expression: QueryExpression): QueryBuilder {
    const where: WhereClause = {
      column,
      expression,
      type: WhereType.Not,
    };

    this.properties.wheres.push(where);

    return this;
  }
}
