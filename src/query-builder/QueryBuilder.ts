import { BaseAdapter } from '../database-adapters/BaseAdapter';
import { JoinType } from './JoinType';
import { QueryType } from './QueryType';
import { WhereType } from './WhereType';
import { ValuesObject } from '../shared/ValuesObject';
import { WhereClause } from './WhereClause';
import { QueryProperties } from './QueryProperties';
import { CompiledQuery } from '../query-compiler/CompiledQuery';
import { QueryCompiler } from '../query-compiler/QueryCompiler';

/**
 * Class which is responsible for building the query
 */
export class QueryBuilder {
  private properties: QueryProperties;

  constructor(private readonly adapter: BaseAdapter) {
    this.properties = new QueryProperties();
  }

  /**
   * Execute compiled SQL query
   */
  public async execute() {
    const { statement, variables } = this.compile();

    return this.adapter.query(statement, variables);
  }

  /**
   * Compile SQL query based on query properties
   */
  public compile(): CompiledQuery {
    const compiler = new QueryCompiler(this.adapter.dialect, this.properties);

    const query = compiler.compile();

    return query;
  }

  /**
   * Set query table name
   */
  public table(tableName: string): QueryBuilder {
    this.properties.table = tableName;

    return this;
  }

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
  public where(expression: string, values: ValuesObject): QueryBuilder {
    const where = new WhereClause(WhereType.Default, expression, values);

    this.properties.wheres.push(where);

    return this;
  }

  /**
   * Add AND WHERE clause to properties array
   */
  public andWhere(expression: string, values: ValuesObject): QueryBuilder {
    const where = new WhereClause(WhereType.And, expression, values);

    this.properties.wheres.push(where);

    return this;
  }

  /**
   * Add OR WHERE clause to properties array
   */
  public orWhere(expression: string, values: ValuesObject): QueryBuilder {
    const where = new WhereClause(WhereType.Or, expression, values);

    this.properties.wheres.push(where);

    return this;
  }

  /**
   * Add WHERE NOT clause to properties array
   */
  public whereNot(expression: string, values: ValuesObject): QueryBuilder {
    const where = new WhereClause(WhereType.Not, expression, values);

    this.properties.wheres.push(where);

    return this;
  }

  /**
   * Add SQL INSERT VALUES for a single entity
   */
  public values(values: ValuesObject): QueryBuilder {
    this.properties.values = values;

    return this;
  }

  /**
   * Add SQL UPDATE SET VALUES for a single entity
   */
  public set(set: ValuesObject): QueryBuilder {
    this.properties.set = set;

    return this;
  }

  /**
   * Add SQL RETURNING clause
   */
  public returning(returning: string): QueryBuilder {
    this.properties.returning = returning;

    return this;
  }

  /**
   * Add SQL INNER JOIN
   */
  public innerJoin(table: string, expression: string): QueryBuilder {
    this.properties.joins.push({
      table,
      expression,
      type: JoinType.Inner,
    });

    return this;
  }

  /**
   * Add SQL LEFT JOIN
   */
  public leftJoin(table: string, expression: string): QueryBuilder {
    this.properties.joins.push({
      table,
      expression,
      type: JoinType.Left,
    });

    return this;
  }

  /**
   * Add SQL RIGHT JOIN
   */
  public rightJoin(table: string, expression: string): QueryBuilder {
    this.properties.joins.push({
      table,
      expression,
      type: JoinType.Right,
    });

    return this;
  }

  /**
   * Add SQL OUTER JOIN
   */
  public outerJoin(table: string, expression: string): QueryBuilder {
    this.properties.joins.push({
      table,
      expression,
      type: JoinType.Outer,
    });

    return this;
  }
}
