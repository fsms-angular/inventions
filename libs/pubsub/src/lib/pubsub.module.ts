import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoggerService } from './contracts/logger';
import { DefaultLoggerService } from './services/default-logger.service';
import { PubsubService } from './services/pubsub.service';

@NgModule({
  imports: [CommonModule],
  exports: [],
  providers: [
    PubsubService,
    { provide: LoggerService, useClass: DefaultLoggerService },
  ],
})
export class PubsubModule {}
