import { Component } from '@angular/core';
import { Message, PubsubService } from '@fsms-angular/pubsub';
import { SubmitOrderCommand } from './messages/submit-order.command';
import { OrderService } from './services/order.service';
import { UiLogger } from './services/ui-logger.service';

@Component({
  selector: 'inventions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public pubsubService: PubsubService,
    public logger: UiLogger,
    public orderService: OrderService
  ) {
    this.pubsubService.subscribe({
      callback: this.createOrder,
      context: this,
      name: 'Create Order Handler',
      topic: SubmitOrderCommand.messageType,
    });

    this.pubsubService.subscribe({
      callback: this.createBigOrder,
      invokeWhen: this.isBigOrder,
      context: this,
      name: 'Create Big Order Handler',
      topic: SubmitOrderCommand.messageType,
    });
  }

  isBigOrder(message: Message): boolean {
    if (
      message.messageType === SubmitOrderCommand.messageType &&
      (message as SubmitOrderCommand).price > 500
    ) {
      return true;
    }
    return false;
  }

  createBigOrder(cmd: SubmitOrderCommand) {
    this.logger.log(`Handling Big Order $${cmd.price}`);
    this.orderService.create({ name: cmd.name, price: cmd.price });
  }

  createOrder(cmd: SubmitOrderCommand) {
    this.logger.log(`Handling Small Order $${cmd.price}`);

    this.orderService.create({ name: cmd.name, price: cmd.price });
  }
}
