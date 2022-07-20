import { PostgresConnectionOptions } from '../database-adapters/postgres/PostgresConnectionOptions';
import { MySqlConnectionOptions } from '../database-adapters/mysql/MySqlConnectionOptions';

/**
 * Union type of database connection options
 */
export type DatabaseConnectionOptions =
  | PostgresConnectionOptions
  | MySqlConnectionOptions;
