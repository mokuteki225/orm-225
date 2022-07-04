import { QueryOperator } from './QueryOperator';
import { DatabaseValue } from '../shared/DatabaseValue';

/**
 * Wrapper class for query operator which stores operator itself and its value
 */
export class QueryExpression {
  constructor(
    private readonly operator: QueryOperator,
    private readonly value: DatabaseValue,
  ) {}
}
