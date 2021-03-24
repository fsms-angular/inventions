import { TestBed } from '@angular/core/testing';
import { Subscription } from '../../contracts/subscription';
import { PubsubModule } from '../../pubsub.module';
import { PubsubService } from '../pubsub.service';

describe('PubSub service', () => {
  let pubsubService: PubsubService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PubsubModule],
      providers: [PubsubService],
    }).compileComponents();

    pubsubService = TestBed.inject(PubsubService);
  });

  it('should be defined', () => {
    expect(pubsubService).toBeDefined();
  });

  describe('subscribe', () => {
    const callback = jasmine.createSpy('callback');
    let subscription;
    const topic = '[sales] order created';
    beforeEach(() => {
      subscription = pubsubService.subscribe({
        callback,
        topic,
      });
    });

    it('should have subscription', () => {
      expect(subscription).toBeDefined();
    });

    it('should have one subscriber', () => {
      expect(pubsubService['subscriptions'].get(topic).size).toBe(1);
    });

    describe('Again subscribe to the same topic', () => {
      const callback2 = jasmine.createSpy('cb2');
      let subscription2;

      beforeEach(() => {
        subscription2 = pubsubService.subscribe({
          callback: callback2,
          topic,
        });
      });

      it('should have subscription', () => {
        expect(subscription2).toBeDefined();
      });

      it('should have one subscriber', () => {
        expect(pubsubService['subscriptions'].get(topic).size).toBe(2);
      });
    });
  });

  describe('unsubscribe', () => {
    const callback = jasmine.createSpy('callback');
    let subscription: Subscription;
    const topic = '[sales] order paid';
    beforeEach(() => {
      subscription = pubsubService.subscribe({
        callback,
        topic,
      });
    });
    it('can unusbscribe by subscription ojbect', () => {
      expect(subscription.unsubscribe()).toBeTruthy();
    });

    it('should have one subscriber', () => {
      expect(pubsubService['subscriptions'].get(topic).size).toBe(1);
    });

    it('can unsubscribe', () => {
      subscription.unsubscribe();
      expect(pubsubService['subscriptions'].get(topic).size).toBe(0);
    });

    it('can unsubscribe all subscribers for the topic', () => {
      pubsubService.unsubscribeAll();

      pubsubService.subscribe({
        callback: (msg) => console.log(`1. ${msg.messageType}`),
        topic,
      });
      pubsubService.subscribe({
        callback: (msg) => console.log(`2. ${msg.messageType}`),
        topic,
      });
      pubsubService.subscribe({
        callback: (msg) => console.log(`3. ${msg.messageType}`),
        topic,
      });

      expect(pubsubService['subscriptions'].get(topic).size).toBe(3);

      pubsubService.unsubscribe({ topic });

      expect(pubsubService['subscriptions'].get(topic).size).toBe(0);
    });
  });
});
