import { QueryExpression } from './QueryExpression';
import { WhereType } from './WhereType';

/**
 * Where clause interface
 */
export interface WhereClause {
  /**
   * Type of where clause
   */
  readonly type: WhereType;

  /**
   * Type of a column
   */
  readonly column: string;

  /**
   * Type of expression column
   */
  readonly expression: QueryExpression;
}
