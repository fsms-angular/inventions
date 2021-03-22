import { Injectable } from '@angular/core';
import { uniqueId } from '@fsms-angular/utils';
import { Message } from './message';

export type Callback = (message: Message) => void;

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

export interface Subscription extends Subscriber {
  subscriberId: string;
  unsubscribe: () => boolean;
}

export interface UnsubscribeInfo {
  topic: string;
  callback: Callback;
}

@Injectable({ providedIn: 'root' })
export class PubsubService {
  private subscriptions = new Map<string, Map<string, Subscription>>();

  publish() {}

  subscribe(newSubscriber: Subscriber) {
    const { topic } = newSubscriber;

    this.assertTopic(topic, 'create');

    const subscribers = this.subscriptions.get(topic);

    if (!subscribers) {
      this.createNewEmptySubscriptions(topic);
    }

    return this.addSubscription(topic, newSubscriber);
  }

  unsubscribe(topic: string) {
    this.assertTopic(topic, 'remove');

    const subscribers = this.subscriptions.get(topic);

    if (!subscribers) return true;

    this.createNewEmptySubscriptions(topic);
  }

  private createNewEmptySubscriptions(topic: string) {
    this.subscriptions.set(topic, new Map());
  }

  private addSubscription(topic: string, subscriber: Subscriber): Subscription {
    const subscriptionId = uniqueId();
    const newSubscription = subscriber as Subscription;
    newSubscription.subscriberId = subscriptionId;
    this.subscriptions[topic].set(subscriptionId, newSubscription);

    this.subscriptions[topic] = new Map(
      [...this.subscriptions[topic]].sort((a, b) => a.order - b.order)
    );

    return newSubscription;
  }

  private assertTopic(topic: string, action: string) {
    if (!topic) {
      throw new Error(
        `You must provide a valid topic to ${action} a subscription.`
      );
    }
  }
}
