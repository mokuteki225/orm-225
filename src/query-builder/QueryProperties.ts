import { QueryType } from './QueryType';
import { WhereClause } from './WhereClause';
import { ValuesObject } from '../shared/ValuesObject';

/**
 * Class of query properties that are used for further SQL compilation
 */
export class QueryProperties {
  /**
   * Table name
   */
  public table: string;

  /**
   * Query type, e.g SELECT, INSERT, UPDATE, DELETE
   */
  public type: QueryType;

  /**
   * SQL WHERE clause
   */
  public wheres: WhereClause[];

  /**
   * SQL LIMIT clause
   */
  public limit?: number;

  /**
   * SQL OFFSET clause
   */
  public offset?: number;

  /**
   * SQL VALUES for INSERT query
   */
  public values?: ValuesObject;

  /**
   * SQL SET VALUES for UPDATE query
   */
  public set?: ValuesObject;

  /**
   * SQL RETURNING clause
   */
  public returning?: string;

  /**
   * Create an empty QueryProperties instance
   */
  public constructor();

  /**
   * Create a QueryProperties instance with certain fields values
   */
  public constructor(properties: Partial<QueryProperties>);

  public constructor(properties?: Partial<QueryProperties>) {
    if (properties) {
      return Object.assign(this, properties);
    }

    this.table = '';
    this.type = QueryType.Select;
    this.wheres = [];
    this.limit = 10;
    this.offset = 0;
    this.values = {};
    this.set = {};
    this.returning = '';

    return this;
  }
}
