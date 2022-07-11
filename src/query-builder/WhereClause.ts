import { WhereType } from './WhereType';
import { QueryExpression } from './QueryExpression';

/**
 * Where clause interface
 */
export interface WhereClause {
  /**
   * Type of where clause
   */
  readonly type: WhereType;

  /**
   * Column name
   */
  readonly column: string;

  /**
   * Clause expression
   */
  readonly expression: QueryExpression;
}
