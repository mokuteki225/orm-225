export interface BaseAdapterInterface {
  query<Entity>(query: string, variables: any[]): Promise<Entity[]>;

  connect(): Promise<void>;

  disconnect(): Promise<void>;
}
