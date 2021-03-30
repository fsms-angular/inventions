import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerService, PubsubModule } from '@fsms-angular/pubsub';
import { AppComponent } from './app.component';
import { DomLogger } from './services/dom.logger.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, PubsubModule, ReactiveFormsModule],
  providers: [
    {
      provide: LoggerService,
      useExisting: DomLogger,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
