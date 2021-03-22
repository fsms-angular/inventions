import { Callback } from './callback';

/**
 * @description
 *
 * Subscription Info
 */

export interface Subscriber {
  topic: string;
  context: unknown;
  callback: Callback;
  /**
   * @description
   * order to execute. order 1 will execute earlier than order 2.
   */
  order: number;
}
