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

export interface SubscriberInfo extends Subscriber {
  subscriberId: string;
}

export interface UnsubscribeInfo {
  topic: string;
  callback: Callback;
}

@Injectable({ providedIn: 'root' })
export class PubsubService {
  subscriptions;
  constructor() {
    this.subscriptions = {};
  }

  publish() {}

  subscribe(subscriber: Subscriber): string {
    const { topic } = subscriber;

    this.assertTopic(topic, 'create');

    const callbacks = this.subscriptions[topic];

    if (!callbacks) {
      this.subscriptions[topic] = [];
    }

    return this.subscribeInOrder(topic, subscriber);
  }

  unsubscribe(topic: string) {
    this.assertTopic(topic, 'remove');
  }

  private subscribeInOrder(topic: string, subscriber: Subscriber) {
    const id = uniqueId();
    (subscriber as SubscriberInfo).subscriberId = id;
    this.subscriptions[topic].push(subscriber);
    this.subscriptions[topic].sort(
      (a: { order: number }, b: { order: number }) => a.order - b.order
    );

    return `${topic}-${id}`;
  }

  private assertTopic(topic: string, action: string) {
    if (!topic) {
      throw new Error(
        `You must provide a valid topic to ${action} a subscription.`
      );
    }
  }
}
