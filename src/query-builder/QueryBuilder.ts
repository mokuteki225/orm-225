import { QueryProperties } from './QueryProperties';

/**
 * Class which is responsible for building the query
 */
export class QueryBuilder {
  private properties: QueryProperties;

  constructor() {
    this.properties = new QueryProperties();
  }
}
