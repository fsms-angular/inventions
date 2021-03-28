import { Component } from '@angular/core';
import { Message, PubsubService } from '@fsms-angular/pubsub';

@Component({
  selector: 'inventions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  orderTotal: number;
  name: string;
  constructor(public pubsubService: PubsubService) {}
  submitOrder() {
    this.pubsubService.publish(new SubmitOrder(this.orderTotal, this.name));
  }
}

export class SubmitOrder extends Message {
  static messageType = '[sales] submit order';

  messageType = SubmitOrder.messageType;

  constructor(public price: number, public name: string) {
    super(SubmitOrder.messageType);
  }
}
