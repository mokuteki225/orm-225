/**
 * Where clause interface
 */
import { QueryExpression } from './QueryExpression';

export interface WhereClause {
  /**
   * Type of where clause
   */
  readonly type: 'default' | 'or' | 'and' | 'not';

  /**
   * Type of a column
   */
  readonly column: string;

  /**
   * Type of expression column
   */
  readonly expression: QueryExpression;
}