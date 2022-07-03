import { QueryType } from './QueryType';
import { WhereClause } from './WhereClause';

export class QueryProperties {
  public type: QueryType;

  public wheres: WhereClause[];

  public limit?: number;

  public offset?: number;
}
