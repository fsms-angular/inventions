import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PubsubModule } from '@fsms-angular/pubsub';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, PubsubModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
