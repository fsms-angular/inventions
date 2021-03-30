import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'inventions-product-orders',
  template: `<fieldset>
    <legend>
      <h2>Orders</h2>
    </legend>
    <ul>
      <li *ngFor="let order of orders">
        New order: <b>{{ order.name }} - {{ order.price | currency }}</b>
      </li>
    </ul>
  </fieldset> `,
})
export class ProductOrdersComponent {
  constructor(public orderService: OrderService) {}

  get orders() {
    return this.orderService.orders;
  }
}
