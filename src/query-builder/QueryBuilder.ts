import { WhereType } from './WhereType';
import { QueryType } from './QueryType';
import { WhereClause } from './WhereClause';
import { QueryProperties } from './QueryProperties';
import { QueryExpression } from './QueryExpression';

/**
 * Class which is responsible for building the query
 */
export class QueryBuilder {
  private properties: QueryProperties;

  constructor() {
    this.properties = new QueryProperties();
  }

  /**
   * Execute compiled SQL query
   */
  public execute() {}

  /**
   * Compile SQL query based on query properties
   */
  public compile() {}

  /**
   * Set select query type
   */
  public select(): QueryBuilder {
    this.properties.type = QueryType.Select;

    return this;
  }

  /**
   * Set insert query type
   */
  public insert(): QueryBuilder {
    this.properties.type = QueryType.Insert;

    return this;
  }

  /**
   * Set update query type
   */
  public update(): QueryBuilder {
    this.properties.type = QueryType.Update;

    return this;
  }

  /**
   * Set delete query type
   */
  public delete(): QueryBuilder {
    this.properties.type = QueryType.Delete;

    return this;
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
