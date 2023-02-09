import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GmapComponent } from './gmap/gmap.component';
import { UserInputComponent } from './user-input/user-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'drone-simulator';
  @ViewChild(GmapComponent) gmapComponent: GmapComponent = new GmapComponent();
  @ViewChild(UserInputComponent) userInputComponent: UserInputComponent =
    new UserInputComponent(new FormBuilder());

  fetchLatLongData(userData: any) {
    // Whenever we get new latitude & longitude information from user, clear old markers and add new markers.
    this.gmapComponent.markers = [];
    userData.forEach((data: { lat: number; lng: number; time: number }) => {
      this.gmapComponent?.markers.push({
        position: new google.maps.LatLng(data.lat, data.lng),
        map: this.gmapComponent?.map,
        time: data.time,
      });
    });
    // Initialize Map based on user provided coordinates
    this.gmapComponent?.mapInitializer();
  }
}
