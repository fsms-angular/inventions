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
      <form #orderForm="ngForm">
        <p class="form-group">
          <input
            required
            type="number"
            placeholder="Enter Price To Charge"
            [(ngModel)]="orderTotal"
            name="orderTotal"
            id="orderTotal"
            #orderTotal="ngModel"
          />
        </p>
        <p>
          <input
            required
            placeholder="Enter Customer Name"
            [(ngModel)]="name"
            name="name"
            #name="ngModel"
            id="name"
          />
        </p>
        <p>
          <button [disabled]="!orderForm.form.valid" (click)="submitOrder()">
            Submit Order
          </button>
        </p>
      </form>
    </fieldset>
  `,
})
export class UsingPubsubComponent {
  orderTotal;
  name;
  constructor(public pubsubService: PubsubService) {}

  submitOrder() {
    this.pubsubService.publish(
      new SubmitOrderCommand(this.orderTotal, this.name)
    );
  }
}
