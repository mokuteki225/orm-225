enum QueryOperator {
  In = 'IN',
  NotIn = 'NOT IN',
  Between = 'BETWEEN',
  NotBetween = 'NOT BETWEEN',
  Like = 'LIKE',
  NotLike = 'NOT LIKE',
  ILike = 'ILIKE',
  NotILike = 'NOT ILIKE',
  Equal = '=',
  NotEqual = '!=',
  GreaterThan = '>',
  GreaterThanEqual = '>=',
  LowerThan = '<',
  LowerThanEqual = '<=',
  Null = 'IS NULL',
  NotNull = 'IS NOT NULL',
}

export class QueryExpression {
  constructor(
    private readonly operator: QueryOperator,
    private readonly value: string, // separate type for database value
  ) {}
}
