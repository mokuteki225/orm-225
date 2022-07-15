import { WhereType } from './WhereType';
import { ExpressionValues } from './ExpressionValues';

/**
 * Where clause class
 */
export class WhereClause {
  constructor(
    /**
     * Type of where clause
     */
    public readonly type: WhereType,
    /**
     * Clause expression values
     */
    public readonly expression: string,
    /**
     * Clause expression
     */
    public readonly values: ExpressionValues,
  ) {}
}
