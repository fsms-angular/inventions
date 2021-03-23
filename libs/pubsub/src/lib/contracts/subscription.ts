import { Subscriber } from './subscriber';

export interface Subscription extends Subscriber {
  subscriberId: string;
  unsubscribe: (options: { topic: string; subscriptionId?: string }) => boolean;
}
