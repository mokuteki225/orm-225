import { QueryType } from './QueryType';
import { WhereClause } from './WhereClause';

/**
 * Class of query properties that are used for further SQL compilation
 */
export class QueryProperties {
  public type: QueryType;

  public wheres: WhereClause[];

  public limit?: number;

  public offset?: number;

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

    this.type = 'select';
    this.wheres = [];
    this.limit = 10;
    this.offset = 0;

    return this;
  }
}
