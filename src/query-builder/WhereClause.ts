import { WhereType } from './WhereType';
import { ValuesObject } from '../shared/ValuesObject';

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
    public readonly values: ValuesObject,
  ) {}
}
