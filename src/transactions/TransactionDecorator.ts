import { Transaction } from './Transaction';
import { TransactionOptions } from './TransactionOptions';

/**
 * Transaction decorator
 */
export function TransactionDecorator(
  options: TransactionOptions,
): MethodDecorator {
  return (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const method = descriptor.value;

    descriptor.value = async () => {
      const transaction = new Transaction(options);

      try {
        await transaction.begin();

        await method();

        await transaction.commit();
      } catch (e) {
        await transaction.rollback();

        throw new Error(e.message);
      }
    };
  };
}
