import { PostgresConnectionOptions } from '../../database-adapters/interfaces/postgres-connection-options.interface';

export type DatabaseDialect = 'postgres' | 'mysql' | 'sqlite';

export interface ConnectionOptions {
  dialect: DatabaseDialect;
  adapterOptions: PostgresConnectionOptions;
}
