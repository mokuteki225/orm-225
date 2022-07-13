import { DatabaseConnectionOptions } from './interfaces/DatabaseConnectionOptions';
import { PostgresConnectionOptions } from '../database-adapters/postgres/interfaces/PostgresConnectionOptions';

import { BaseAdapter } from '../database-adapters/BaseAdapter';
import { PostgresAdapter } from '../database-adapters/postgres/PostgresAdapter';

export class Connection {
  public static async connect(
    options: DatabaseConnectionOptions,
  ): Promise<BaseAdapter> {
    const { dialect } = options;

    let adapter: BaseAdapter;

    switch (dialect) {
      case 'postgres': {
        const postgresOptions = options as PostgresConnectionOptions;

        adapter = new PostgresAdapter(postgresOptions);

        break;
      }

      default: {
        throw new Error('Unknown database dialect');
      }
    }

    await adapter.connect();

    return adapter;
  }
}
