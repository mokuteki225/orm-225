/**
 * Connection options for MySQL
 */

export interface MySqlConnectionOptions {
  /**
   * Database dialect
   */
  readonly dialect: 'mysql';

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
