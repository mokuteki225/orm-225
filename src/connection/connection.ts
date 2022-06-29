import { ConnectionOptions } from './interfaces/connection-options.interface';
import { BaseAdapter } from '../database-adapters/interfaces/base-adapter.interface';

import { PostgresAdapter } from '../database-adapters/postgres-adapter';

export class Connection {
  public static async connect(
    connectionOptions: ConnectionOptions,
  ): Promise<BaseAdapter> {
    const adapter = this.recognizeDatabaseDialect(connectionOptions);

    await adapter.connect();

    return adapter;
  }

  private static recognizeDatabaseDialect(
    connectionOptions: ConnectionOptions,
  ): BaseAdapter {
    const { dialect, adapterOptions } = connectionOptions;

    switch (dialect) {
      case 'postgres': {
        return new PostgresAdapter(adapterOptions);
      }
      case 'mysql': {
      }
      case 'sqlite': {
      }
      default: {
        throw new Error('Unknown database dialect');
      }
    }
  }
}
