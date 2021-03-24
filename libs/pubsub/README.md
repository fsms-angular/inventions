# Angular PubSub

Angular 11.x implementation of the [publish subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) Pattern.

<!-- Angular Badges-->

![npm](https://img.shields.io/npm/v/@fsms-angular/pubsub?color=dark&label=npm%20package) ![Angular Version](https://img.shields.io/github/package-json/dependency-version/fsms-angular/inventions/@angular/core) ![RxJS](https://img.shields.io/github/package-json/dependency-version/fsms-angular/inventions/rxjs)

<!-- Angular Badges-->

<!-- Azure Badges-->

[![Build Status](https://dev.azure.com/fullstackmaster-org/FSMS-OPENSOURCE/_apis/build/status/fsms-angular.inventions?branchName=main)](https://dev.azure.com/fullstackmaster-org/FSMS-OPENSOURCE/_build/latest?definitionId=5&branchName=main) ![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/fullstackmaster-org/fsms-opensource/5)

<!-- Azure Badges-->

<!-- Statistics Badges-->

![downloads](https://img.shields.io/npm/dw/@fsms-angular/pubsub?style=flat) ![GitHub repo size](https://img.shields.io/github/repo-size/fsms-angular/inventions) ![GitHub pull requests](https://img.shields.io/github/issues-pr/fsms-angular/inventions) ![GitHub last commit](https://img.shields.io/github/last-commit/fsms-angular/inventions)

<!-- Statistics Badges-->

<!-- Dependency and Socials Badges-->

[![dependencies Status](https://status.david-dm.org/gh/fsms-angular/inventions.svg)](https://david-dm.org/fsms-angular/inventions) ![GitHub User's stars](https://img.shields.io/github/stars/fsms-angular?style=social) ![GitHub Sponsors](https://img.shields.io/github/sponsors/fsms-angular?style=social)

<!-- Dependency and Socials Badges-->

> By [Rupesh Tiwari](https://rupeshtiwari.com) > <img src="https://i.imgur.com/9OCLciM.png" width="100" height="30">

**If you enjoy @fsms-angular/pubsub, please consider pressing the star button on [my repo](https://github.com/fsms-angular/inventions) & [supporting me](https://github.com/sponsors/rupeshtiwari) for years of development (and to unlock rewards!) ❤**

---

**Table of Contents**

- [Angular PubSub](#angular-pubsub)
  - [Installing @fsms-angular/pubsub](#installing-fsms-angularpubsub)
    - [Message](#message)
    - [Angular Pub/Sub Service](#angular-pubsub-service)
  - [Using Angular PubSub Service](#using-angular-pubsub-service)
    - [Importing PubsubModule](#importing-pubsubmodule)
    - [Injecting `PubsubService` as dependency in component](#injecting-pubsubservice-as-dependency-in-component)
    - [Subscribing to message](#subscribing-to-message)
    - [Publishing a Message](#publishing-a-message)
    - [Unsubscribing Messages](#unsubscribing-messages)
  - [Contributions](#contributions)

---

## Installing @fsms-angular/pubsub

**npm installation**

```shell
npm i -S @fsms-angular/pubsub
```

You need `Message` class to create your messages and you need `PubsubService` to publish or subscribe messages.

### Message

`Message` holds `messageType` and optional payload

```ts
export class Message {
  static messageType = 'message';
  constructor(public messageType: string) {}
}
```

Example of one message:

```ts
import { Message } from '@fsms-angular/pubsub';

export class PlaceOrder implements Message {
  static messageType = '[Sells] Place Order';
  messageType = PlaceOrder.messageType;
  constructor(public payload?: string) {}
}
```

### Angular Pub/Sub Service

`pubsubService` is used to publish and subscribe messages.

```ts
  publish(message: Message):void;
  subscribe(newSubscriber: PubsubSubscriber): PubsubSubscription;
```

## Using Angular PubSub Service

Let's learn how to use angular `pubsub service`.

### Importing PubsubModule

Initialize module for in your angular root module.

```ts

import { PubSubModule } from '@fsms-angular/pubsub';  👆  // Importing Angular Pubsub module

@NgModule({
declarations: [
   RootComponent,
   NavigationComponent,
   OverlayComponent
],
imports: [
   BrowserModule,
   FormsModule,
   HttpModule,
   PubSubModule 👈 // Initiate Pubsub module
],
providers: [],
bootstrap: [RootComponent]
});

```

### Injecting `PubsubService` as dependency in component

Go to desired component and subscribe to a message.

```ts
import { Component } from '@angular/core';
import { PubsubService } from '@fsms-angular/pubsub';   👆 // Importing Angular Pubsub module

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
   constructor(
     private pubsubService: PubsubService) {}
               👆// Injecting Angular Pubsub Service
}
```

### Subscribing to message

In `ngOnInit` method of angular component, you can subscribe to the message that you want to handle.

```ts
import { PubsubService, PubsubSubscription } from '@fsms-angular/pubsub';
import { PlaceOrder } from './orders/messages/place-order-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  subscriptions: PubsubSubscription[] = [];

  constructor(private pubsubService: PubsubService) {}

  ngOnInit(): void {

    this.subscriptions.push(
      this.pubsubService.subscribe({ 👈// Subscribing to a message
        messageType: PlaceOrder.messageType,
        callback: (msg) => console.log('received', msg),
      })
    );
  }
}
```

### Publishing a Message

The `publish` method takes one argument where it expect the `Message` object.

Example: Now on a button click, I want to publish a message with some payload.

```ts
import { Component } from '@angular/core';
import { OrderPlaced } from './messages/placeorder-message';
import { PubsubService } from '@fsms-angular/pubsub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private pubsubService: PubsubService) {}

  orderPlaced($event: KeyboardEvent) {
    $event.preventDefault();

    this.pubsubService.publish(
      // Publishing a message👆
      new OrderCreated({
        orderId: new Date().getTime().toString(36),
        item: '20 Apples',
      })
    );
  }
}
```

### Unsubscribing Messages

In order for avoiding memory leak. Keep all subscriptions per component in an array. And On component you must unsubscribe your subscriptions on `ngOnDestroy` event.

```ts
 ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());👈// Unsubscribing a message
  }
```

## Contributions

Contributions are welcome!🙂 If you find any problems or would like to contribute in any way, feel free to create a pull request/open an issue/send me a message.

You can also contribute by becoming an [official sponsor](https://github.com/sponsors/rupeshtiwari) to help keep Angular Pub-Sub well-maintained.

💖 Say 👋 to me!<br>
Rupesh Tiwari<br>
<a href="https://www.rupeshtiwari.com"> www.rupeshtiwari.com</a><br>
✉️ <a href="mailto:fullstackmaster1@gmail.com?subject=Hi"> Email Rupesh Tiwari</a><br>
Founder of <a href="https://www.fullstackmaster.net"> Fullstack Master</a>
