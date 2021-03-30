/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { DefaultLoggerService } from '@fsms-angular/pubsub';

@Injectable({ providedIn: 'root' })
export class DomLogger extends DefaultLoggerService {
  logs = [];
  error(message?: any, ...optionalParams: any[]): void {
    this.logs.push(message);
  }
  log(message?: any, ...optionalParams: any[]): void {
    this.logs.push(message);
  }
  warn(message?: any, ...optionalParams: any[]): void {
    this.logs.push(message);
  }
}
