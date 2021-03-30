import { Component } from '@angular/core';
import { LoggerService } from '@fsms-angular/pubsub';
import { DomLogger } from '../services/dom.logger.service';

@Component({
  selector: 'inventions-show-logs',
  template: `
    <fieldset>
      <legend>
        <h2>Log</h2>
      </legend>
      <ul>
        <li *ngFor="let log of logs">
          {{ log }}
        </li>
      </ul>
    </fieldset>
  `,
})
export class ShowLogComponent {
  constructor(public logger: LoggerService) {}
  get logs() {
    return (this.logger as DomLogger).logs;
  }
}
