import { Injectable } from '@angular/core';
import { uniqueId } from '@fsms-angular/utils';

@Injectable({ providedIn: 'root' })
export class OrderService {
  orders = [];

  create({ name, price }) {
    const newOrder = { name, price, id: uniqueId };
    this.orders.push(newOrder);

    return Promise.resolve(newOrder);
  }
}
