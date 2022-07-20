/**
 * Connection options for Postgres
 */
export interface PostgresConnectionOptions {
  /**
   * Database dialect
   */
  readonly dialect: 'postgres';

  /**
   * Database user
   */
  readonly user: string;

  /**
   * Database name
   */
  readonly database: string;

  /**
   * Database password
   */
  readonly password: string;

  /**
   * database host
   */
  readonly host: string;

  /**
   * Database port
   */
  readonly port: number;
}
