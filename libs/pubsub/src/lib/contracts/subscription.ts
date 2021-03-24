import { PubsubSubscriber } from './subscriber';

export interface PubsubSubscription extends PubsubSubscriber {
  subscriberId: string;
  unsubscribe: () => boolean;
}
