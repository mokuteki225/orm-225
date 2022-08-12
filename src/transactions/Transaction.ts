import { IsolationLevels } from './IsolationLevels';
import { BaseAdapter } from 'src/database-adapters/BaseAdapter';
import { ConnectionManager } from 'src/connection/ConnectionManager';
import { TransactionOptions } from './TransactionOptions';

export class Transaction {
  private readonly adapter: BaseAdapter;
  private readonly isolationLevel: IsolationLevels;

  constructor(private readonly options: TransactionOptions) {
    const isolationLevel =
      options.isolationLevel || IsolationLevels.READ_COMMITTED;
    const connectionName = options.connectionName || 'default';

    this.isolationLevel = isolationLevel;

    const connectionManager = ConnectionManager.getInstance();
    this.adapter = connectionManager.get(connectionName || 'default');
  }

  public async begin(): Promise<void> {
    await this.adapter.query(
      `BEGIN TRANSACTION ISOLATION LEVER ${this.isolationLevel}`,
    );
  }

  public async commit(): Promise<void> {
    await this.adapter.query('COMMIT');
  }

  public async rollback(): Promise<void> {
    await this.adapter.query('ROLLBACK');
  }
}
