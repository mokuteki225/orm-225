import { PostgresConnectionOptions } from '../database-adapters/postgres/PostgresConnectionOptions';
import { MySqlConnectionOptions } from '../database-adapters/mysql/MySqlConnectionOptions';
import { SqliteConnectionOptions } from 'src/database-adapters/sqlite/SqliteConnectionOptions';

/**
 * Union type of database connection options
 */
export type DatabaseConnectionOptions =
  | PostgresConnectionOptions
  | MySqlConnectionOptions
  | SqliteConnectionOptions;
