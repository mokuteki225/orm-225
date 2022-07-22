/**
 * Connection options for SQLite
 */
export class SqliteConnectionOptions {
  /**
   * Database dialect
   */
  readonly dialect: 'sqlite';

  /**
   * Database filepath
   */
  readonly file: string;
}
