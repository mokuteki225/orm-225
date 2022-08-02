import { BaseAdapter } from 'src/database-adapters/BaseAdapter';

/**
 * Wrapper class for the hashmap of connections (adapters)
 */
export class ConnectionManager {
  private static instance: ConnectionManager;

  private readonly connections = new Map<string, BaseAdapter>();

  public get(key: string): BaseAdapter {
    const value = this.connections.get(key);

    if (!value) {
      throw new Error('There is no connection under this name');
    }

    return value;
  }

  public set(key: string, connection: BaseAdapter): void {
    this.connections.set(key, connection);
  }

  public static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }

    return ConnectionManager.instance;
  }
}
