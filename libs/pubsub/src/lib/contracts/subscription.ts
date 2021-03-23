import { Subscriber } from './subscriber';

export interface Subscription extends Subscriber {
  subscriberId: string;
  unsubscribe: () => boolean;
}
