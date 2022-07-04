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

  constructor() {
    this.type = 'select';
    this.wheres = [];
    this.limit = 10;
    this.offset = 0;
  }
}
