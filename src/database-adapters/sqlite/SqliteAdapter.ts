import { Database } from 'sqlite3';
import { BaseAdapter } from '../BaseAdapter';
import { DatabaseDialect } from '../../connection/DatabaseDialect';
import { SqliteConnectionOptions } from './SqliteConnectionOptions';

export class SqliteAdapter implements BaseAdapter {
  public dialect: DatabaseDialect = 'sqlite';

  private db: Database;

  constructor(private readonly connectionOptions: SqliteConnectionOptions) {}

  public async query<Entity>(
    statement: string,
    variables?: any[],
  ): Promise<Entity[]> {
    return new Promise<Entity[]>((resolve, reject) => {
      const callback = (result, err) => (err ? reject(err) : resolve(result));

      this.db.run(statement, variables, callback);
    });
  }

  public async connect(): Promise<void> {
    this.db = new Database(this.connectionOptions.file);
  }

  public async disconnect(): Promise<void> {
    this.db.close();
  }
}
