import { Pool, createPool } from 'mysql';
import { BaseAdapter } from '../BaseAdapter';
import { DatabaseDialect } from '../../connection/DatabaseDialect';
import { MySqlConnectionOptions } from './MySqlConnectionOptions';

export class MySqlAdapter implements BaseAdapter {
  public dialect: DatabaseDialect = 'mysql';

  private pool: Pool;

  constructor(private readonly connectionOptions: MySqlConnectionOptions) {}

  public async query<Entity>(
    statement: string,
    variables: any[],
  ): Promise<Entity[]> {
    return new Promise<Entity[]>((resolve, reject) => {
      const callback = (err, result) =>
        err ? reject(err.message) : resolve(result);

      this.pool.query(statement, variables, callback);
    });
  }

  public async connect(): Promise<void> {
    this.pool = createPool(this.connectionOptions);
  }

  public async disconnect(): Promise<void> {
    await this.pool.end();
  }
}
