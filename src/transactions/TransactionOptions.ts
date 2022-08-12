import { IsolationLevels } from './IsolationLevels';

export interface TransactionOptions {
  readonly connectionName?: string;

  readonly isolationLevel?: IsolationLevels;
}
