import { Message } from '../contracts/message';

export type CanInvokeCallBack = (message: Message) => boolean;
export type Callback = (message: Message) => void;
