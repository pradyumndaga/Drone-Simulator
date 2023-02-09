import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { GmapComponent } from './gmap/gmap.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, UserInputComponent, GmapComponent],
  imports: [BrowserModule, GoogleMapsModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
