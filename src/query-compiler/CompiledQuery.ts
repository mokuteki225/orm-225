/**
 * Wrapper class for parameterized SQL statement and its variables
 */
export class CompiledQuery {
  constructor(
    /**
     * Statement of the compiled parameterized SQL query
     */
    public readonly statement: string,
    /**
     * Array of variables of parameterized SQL query
     */
    public readonly variables: any[],
  ) {}
}
