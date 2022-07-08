import { QueryProperties } from '../query-builder/QueryProperties';
import { CompiledQuery } from './CompiledQuery';

/**
 * Compile SQL query based on QueryProperties
 */
export class QueryCompiler {
  constructor(private readonly properties: QueryProperties) {}

  public compile(): CompiledQuery {}
}
