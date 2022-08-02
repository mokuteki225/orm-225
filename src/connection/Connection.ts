import { DatabaseConnectionOptions } from './DatabaseConnectionOptions';
import { PostgresConnectionOptions } from '../database-adapters/postgres/PostgresConnectionOptions';

import { BaseAdapter } from '../database-adapters/BaseAdapter';
import { PostgresAdapter } from '../database-adapters/postgres/PostgresAdapter';
import { MySqlConnectionOptions } from '../database-adapters/mysql/MySqlConnectionOptions';
import { MySqlAdapter } from '../database-adapters/mysql/MySqlAdapter';
import { SqliteConnectionOptions } from '../database-adapters/sqlite/SqliteConnectionOptions';
import { SqliteAdapter } from '../database-adapters/sqlite/SqliteAdapter';
import { ConnectionManager } from './ConnectionManager';

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

      case 'sqlite': {
        const sqliteOptions = options as SqliteConnectionOptions;

        adapter = new SqliteAdapter(sqliteOptions);

        break;
      }

      default: {
        throw new Error('Unknown database dialect');
      }
    }

    await adapter.connect();

    ConnectionManager.getInstance().set('default', adapter);

    return adapter;
  }
}
