import { Message } from './message';

export interface ICanCorrelateMessage {
  isCorrelatedBy(message: Message): boolean;
}
