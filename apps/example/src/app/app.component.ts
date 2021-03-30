import { Component } from '@angular/core';
import { PubsubService } from '@fsms-angular/pubsub';
import { SubmitOrderCommand } from './messages/submit-order.command';
import { OrderService } from './services/order.service';

@Component({
  selector: 'inventions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


  constructor(
    public pubsubService: PubsubService,

    public orderService: OrderService
  ) {
    this.pubsubService.subscribe({
      callback: this.createOrder,
      context: this,
      name: 'Create Order Handler',
      topic: SubmitOrderCommand.messageType,
    });
  }

  createOrder(cmd: SubmitOrderCommand) {
    this.orderService.create({ name: cmd.name, price: cmd.price });
  }


}
