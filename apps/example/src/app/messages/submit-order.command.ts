import { Message } from '@fsms-angular/pubsub';


export class SubmitOrderCommand extends Message {
  static messageType = '[sales] submit order';

  messageType = SubmitOrderCommand.messageType;

  constructor(public price: number, public name: string) {
    super(SubmitOrderCommand.messageType);
  }
}
