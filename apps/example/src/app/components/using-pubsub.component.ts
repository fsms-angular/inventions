import { Component } from '@angular/core';
import { PubsubService } from '@fsms-angular/pubsub';
import { SubmitOrderCommand } from '../messages/submit-order.command';

@Component({
  selector: 'inventions-using-pubsub',
  template: `
    <fieldset>
      <legend>
        <h2>submit order</h2>
      </legend>
      <form required>
        <p>
          <input
            required
            type="number"
            placeholder="Enter Price To Charge"
            ngModel
            name="orderTotal"
            id="orderTotal"
          />
        </p>
        <p>
          <input
            required
            placeholder="Enter Customer Name"
            ngModel
            name="name"
            id="name"
          />
        </p>
        <p>
          <button (click)="submitOrder()">Submit Order</button>
        </p>
      </form>
    </fieldset>
  `,
})
export class UsingPubsubComponent {
  orderTotal = 10;
  name = 'Rupesh';
  constructor(public pubsubService: PubsubService) {}

  submitOrder() {
    this.pubsubService.publish(
      new SubmitOrderCommand(this.orderTotal, this.name)
    );
  }
}
