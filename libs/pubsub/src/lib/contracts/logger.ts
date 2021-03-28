/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class LoggerService {
  abstract error(message?: any, ...optionalParams: any[]): void;
  abstract log(message?: any, ...optionalParams: any[]): void;
  abstract warn(message?: any, ...optionalParams: any[]): void;
}
