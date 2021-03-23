import { Inject } from '@angular/core';
import { uniqueId } from '@fsms-angular/utils';
import { Message } from '../contracts/message';
import { Subscriber } from '../contracts/subscriber';
import { Subscription } from '../contracts/Subscription';

@Inject({ providedIn: 'root' })
export class PubsubService {
  protected subscriptions = new Map<string, Map<string, Subscription>>();

  publish(message: Message) {
    const subscribers = this.subscriptions.get(message.messageType);
    for (const [, subscriber] of subscribers) {
      // eslint-disable-next-line prefer-rest-params
      subscriber.callback.call(subscriber.context, arguments);
    }
  }

  subscribe(newSubscriber: Subscriber) {
    const { topic } = newSubscriber;

    this.assertTopic(topic, 'create');

    const subscribers = this.subscriptions.get(topic);

    if (!subscribers) {
      this.createNewEmptySubscriptions(topic);
    }

    return this.addSubscription(topic, newSubscriber);
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

  private addSubscription(topic: string, subscriber: Subscriber): Subscription {
    const subscriptionId = uniqueId();
    const newSubscription = subscriber as Subscription;
    newSubscription.subscriberId = subscriptionId;
    this.subscriptions.get(topic).set(subscriptionId, newSubscription);

    this.subscriptions[topic] = new Map(
      [...this.subscriptions.get(topic)].sort(
        ([, a], [, b]) => a.order - b.order
      )
    );

    newSubscription.unsubscribe = this.unsubscribe.bind(this);

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
