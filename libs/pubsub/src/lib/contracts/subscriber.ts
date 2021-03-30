import { Callback } from './callback';

/**
 * @description
 *
 * Subscription Info
 */

export interface PubsubSubscriber {
  topic: string;
  context?: unknown | null;
  callback: Callback;
  name?: string;
  /**
   * @description
   * order to execute. order 1 will execute earlier than order 2.
   */
  order?: number | 0;
}
