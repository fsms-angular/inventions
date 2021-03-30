import { Component } from '@angular/core';
import { LoggerService, PubsubService } from '@fsms-angular/pubsub';
import { SubmitOrderCommand } from './messages/submit-order.command';
import { DomLogger } from './services/dom.logger.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'inventions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  orderTotal = 10;
  name = 'Rupesh';

  constructor(
    public pubsubService: PubsubService,
    public logger: LoggerService,
    public orderService: OrderService
  ) {
    this.pubsubService.subscribe({
      callback: this.createOrder,
      context: this,
      topic: SubmitOrderCommand.messageType,
    });
  }

  submitOrder() {
    this.pubsubService.publish(
      new SubmitOrderCommand(this.orderTotal, this.name)
    );
  }

  createOrder(cmd: SubmitOrderCommand) {
    this.orderService.create({ name: cmd.name, price: cmd.price });
  }

  get logs() {
    return (this.logger as DomLogger).logs;
  }

  get orders() {
    return this.orderService.orders;
  }
}
