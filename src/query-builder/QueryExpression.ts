import { QueryOperator } from './QueryOperator';
import { DatabaseValue } from '../shared/DatabaseValue';

/**
 * Wrapper class for query operator which stores operator itself and its value
 */
export class QueryExpression {
  constructor(
    public readonly operator: QueryOperator,
    public readonly value: DatabaseValue,
  ) {}
}
