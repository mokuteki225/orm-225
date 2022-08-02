import { ConnectionManager } from 'src/connection/ConnectionManager';

/**
 * Transaction decorator
 */
export function Transaction(connectionName?: string): MethodDecorator {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const method = descriptor.value;

    descriptor.value = async () => {
      const key = connectionName || 'default';

      const connection = ConnectionManager.getInstance().get(key);

      try {
        await connection.query('BEGIN');

        await method();

        await connection.query('COMMIT');
      } catch (e) {
        await connection.query('ROLLBACK');

        throw new Error(e.message);
      }
    };
  };
}
