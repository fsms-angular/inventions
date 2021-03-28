/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { LoggerService } from '../contracts/logger';

@Injectable()
export class DefaultLoggerService implements LoggerService {
  error(message?: any, extra?: any) {
    if (message) {
      extra ? console.error(message, extra) : console.error(message);
    }
  }

  log(message?: any, extra?: any) {
    if (message) {
      extra ? console.log(message, extra) : console.log(message);
    }
  }

  warn(message?: any, extra?: any) {
    if (message) {
      extra ? console.warn(message, extra) : console.warn(message);
    }
  }
}
