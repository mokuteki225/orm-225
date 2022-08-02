import { Pool } from 'pg';

import { BaseAdapter } from '../BaseAdapter';
import { PostgresConnectionOptions } from './PostgresConnectionOptions';
import { DatabaseDialect } from '../../connection/DatabaseDialect';

export class PostgresAdapter implements BaseAdapter {
  public dialect: DatabaseDialect = 'postgres';

  private pool: Pool;

  constructor(private readonly connectionOptions: PostgresConnectionOptions) {}

  public async query<Entity>(
    statement: string,
    variables?: any[],
  ): Promise<Entity[]> {
    const { rows } = await this.pool.query<Entity>(statement, variables);

    return rows;
  }

  public async connect(): Promise<void> {
    this.pool = new Pool(this.connectionOptions);
  }

  public async disconnect(): Promise<void> {
    await this.pool.end();
  }
}
