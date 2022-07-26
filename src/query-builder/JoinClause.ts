import { JoinType } from './JoinType';

/**
 * Join clause class
 */
export class JoinClause {
  constructor(
    /**
     * Type of join clause
     */
    public readonly type: JoinType,
    /**
     * Table to join
     */
    public readonly table: string,
    /**
     * Expression
     */
    public readonly expression: string,
  ) {}
}
