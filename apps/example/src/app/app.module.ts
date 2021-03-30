import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerService, PubsubModule } from '@fsms-angular/pubsub';
import { AppComponent } from './app.component';
import { ProductOrdersComponent } from './components/product-orders.component';
import { ShowLogComponent } from './components/show-logs.components';
import { UsingPubsubComponent } from './components/using-pubsub.component';
import { UiLogger } from './services/ui-logger.service';

@NgModule({
  declarations: [
    AppComponent,
    ShowLogComponent,
    UsingPubsubComponent,
    ProductOrdersComponent,
  ],
  imports: [BrowserModule, FormsModule, PubsubModule, ReactiveFormsModule],
  providers: [
    {
      provide: LoggerService,
      useExisting: UiLogger,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
