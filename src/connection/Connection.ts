import { DatabaseConnectionOptions } from './DatabaseConnectionOptions';
import { PostgresConnectionOptions } from '../database-adapters/postgres/PostgresConnectionOptions';

import { BaseAdapter } from '../database-adapters/BaseAdapter';
import { PostgresAdapter } from '../database-adapters/postgres/PostgresAdapter';
import { MySqlConnectionOptions } from '../database-adapters/mysql/MySqlConnectionOptions';
import { MySqlAdapter } from '../database-adapters/mysql/MySqlAdapter';

/**
 * Database connection class
 */
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

      case 'mysql': {
        const mysqlOptions = options as MySqlConnectionOptions;

        adapter = new MySqlAdapter(mysqlOptions);

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
