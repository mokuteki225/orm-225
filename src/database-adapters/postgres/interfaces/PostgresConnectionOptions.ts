/**
 * Connection options for Postgres
 */
export interface PostgresConnectionOptions {
  /**
   * Database dialect
   */
  readonly dialect: 'postgres';

  /**
   * Database username
   */
  readonly username: string;

  /**
   * Database name
   */
  readonly database: string;

  /**
   * Database password
   */
  readonly password: string;

  /**
   * Database port
   */
  readonly port: number;

  /**
   * Database host
   */
  readonly host: string;
}
