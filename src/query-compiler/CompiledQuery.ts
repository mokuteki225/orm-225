/**
 * Wrapper class for parameterized SQL statement and its variables
 */
export class CompiledQuery {
  constructor(
    /**
     * Statement of the compiled parameterized SQL query
     */
    private readonly statement: string,
    /**
     * Array of variables of parameterized SQL query
     */
    private readonly variables: any[],
  ) {}
}
