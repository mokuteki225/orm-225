import { Pool } from 'pg';

import { BaseAdapter } from '../BaseAdapter';
import { PostgresConnectionOptions } from './interfaces/PostgresConnectionOptions';

export class PostgresAdapter implements BaseAdapter {
  private pool: Pool;

  constructor(private readonly connectionOptions: PostgresConnectionOptions) {}

  public async query<Entity>(
    query: string,
    variables: any[],
  ): Promise<Entity[]> {
    const { rows } = await this.pool.query<Entity>(query, variables);

    return rows;
  }

  public async connect(): Promise<void> {
    this.pool = new Pool(this.connectionOptions);
  }

  public async disconnect(): Promise<void> {
    await this.pool.end();
  }
}
