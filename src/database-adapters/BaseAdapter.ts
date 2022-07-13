export interface BaseAdapter {
  query<Entity>(statement: string, variables: any[]): Promise<Entity[]>;

  connect(): Promise<void>;

  disconnect(): Promise<void>;
}
