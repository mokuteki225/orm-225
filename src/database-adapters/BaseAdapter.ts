import { DatabaseDialect } from '../connection/DatabaseDialect';

export interface BaseAdapter {
  dialect: DatabaseDialect;

  query<Entity>(statement: string, variables?: any[]): Promise<Entity[]>;

  connect(): Promise<void>;

  disconnect(): Promise<void>;
}
