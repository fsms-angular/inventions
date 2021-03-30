/* eslint-disable prefer-rest-params */
import { Injectable } from '@angular/core';
import { uniqueId } from '@fsms-angular/utils';
import { ICanCorrelateMessage } from '../contracts/context';
import { LoggerService } from '../contracts/logger';
import { Message } from '../contracts/message';
import { PubsubSubscriber } from '../contracts/subscriber';
import { PubsubSubscription } from '../contracts/Subscription';

export const DEFAULT_ORDER = 15;

@Injectable({ providedIn: 'root' })
export class PubsubService {
  protected subscriptions = new Map<string, Map<string, PubsubSubscription>>();

  constructor(public logger: LoggerService) {}

  publish(message: Message): void {
    const subscribers = this.subscriptions.get(message.messageType);
    if (!subscribers) {
      this.trace(`No subscribers found for message "${message.messageType}"`);
      return;
    }

    this.trace(
      `${subscribers.size} subscribers found for message "${message.messageType}"`
    );

    for (const [, subscriber] of subscribers) {
      if (this.canInvoke(subscriber, message))
        subscriber.callback.call(subscriber.context, arguments);
    }
  }

  private canInvoke(subscriber: PubsubSubscription, message: Message) {
    const finder = subscriber.context as ICanCorrelateMessage;
    if (finder.isCorrelatedBy) {
      if (finder.isCorrelatedBy(message)) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  private trace(msg: string) {
    this.logger.log(`Trace: ${msg}`);
  }

  unsubscribeAll() {
    this.subscriptions.clear();
  }

  subscribe(newSubscriber: PubsubSubscriber): PubsubSubscription {
    const { topic } = newSubscriber;

    this.assertTopic(topic, 'create');

    const subscribers = this.subscriptions.get(topic);

    if (!subscribers) {
      this.createNewEmptySubscriptions(topic);
    }

    const subscription = this.addSubscription(topic, newSubscriber);

    this.trace(`"${topic}" is subscribed.`);

    return subscription;
  }

  unsubscribe({
    topic,
    subscriptionId,
  }: {
    topic: string;
    subscriptionId?: string;
  }) {
    this.assertTopic(topic, 'remove');

    const subscribers = this.subscriptions.get(topic);

    if (!subscribers) return false;

    if (subscriptionId) {
      subscribers.delete(subscriptionId);
    } else {
      this.createNewEmptySubscriptions(topic);
    }

    return true;
  }

  private createNewEmptySubscriptions(topic: string) {
    this.subscriptions.set(topic, new Map());
  }

  private addSubscription(
    topic: string,
    subscriber: PubsubSubscriber
  ): PubsubSubscription {
    const subscriptionId = uniqueId();
    const newSubscription = subscriber as PubsubSubscription;
    newSubscription.subscriberId = subscriptionId;
    newSubscription.order = newSubscription.order || DEFAULT_ORDER;

    this.subscriptions.get(topic).set(subscriptionId, newSubscription);

    this.subscriptions[topic] = new Map(
      [...this.subscriptions.get(topic)].sort(
        ([, a], [, b]) => a.order - b.order
      )
    );

    newSubscription.unsubscribe = () =>
      this.unsubscribe({ topic, subscriptionId });

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
