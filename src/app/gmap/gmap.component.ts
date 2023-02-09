import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
})
export class GmapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false })
  gmap!: ElementRef;
  @Input() enableSimulationButton = false;
  markers: {
    position: google.maps.LatLng;
    map?: google.maps.Map;
    time: number;
  }[] = [];
  drone: any;
  droneCoordMap: google.maps.LatLng[] = [];
  droneIdx = 0;
  pauseSimulation = false;
  enableSlider = false;
  droneRoute: any;
  totalRoute: number = 0;
  map?: google.maps.Map;
  mapOptions: google.maps.MapOptions = {};

  constructor() {}

  /**
   * @returns void
   */
  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  /**
   * @returns void
   * @description To check if any markers present. Initialize map w.r.t. marker else, initialize world map
   */
  mapInitializer(): void {
    this.mapOptions = {
      center: this.markers[0]
        ? new google.maps.LatLng(
            this.markers[0].position.lat(),
            this.markers[0].position.lng()
          )
        : new google.maps.LatLng(0, 0),
      zoom: this.markers[0] ? 7 : 2,
    };
    this.map = new google.maps.Map(this.gmap?.nativeElement, this.mapOptions);

    // Add Markers in map, only if marker information available
    this.markers.forEach((markerInfo: google.maps.MarkerOptions) => {
      const marker = new google.maps.Marker({
        ...markerInfo,
      });
      marker.setMap(this.map as google.maps.Map);
    });
  }

  /**
   * @returns void
   * @description Initialize all required flags, list, index and constants
   */
  animateDrone(): void {
    this.pauseSimulation = false;
    this.droneCoordMap = [];
    this.droneIdx = 0;
    this.enableSlider = true;

    // Initialize Drone and Path for Drone traversal
    const lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 4,
      strokeColor: 'blue',
    };
    if (this.droneRoute) {
      const icons = this.droneRoute.get('icons');
      this.droneRoute.set('icons', {
        icon: lineSymbol,
        offset: '0%',
      });
    }

    this.droneRoute = new google.maps.Polyline({
      path: this.markers.map((marker) => {
        return { lat: marker.position.lat(), lng: marker.position.lng() };
      }),
      icons: [
        {
          icon: lineSymbol,
          offset: '0%',
        },
      ],
      map: this.map,
      strokeColor: 'green',
    });

    // Calculate and store all coordinates for drone while traversing to each marker and store it in droneCoordMap
    for (var idx = 0; idx < this.markers.length - 1; idx++) {
      const fromLat = this.markers[idx].position.lat();
      const toLat = this.markers[idx + 1].position.lat();
      const fromLng = this.markers[idx].position.lng();
      const toLng = this.markers[idx + 1].position.lng();

      const incr = 1 / this.markers[idx + 1].time;

      for (var percent = 0; percent <= 1; percent += incr) {
        const curLat = fromLat + percent * (toLat - fromLat);
        const curLng = fromLng + percent * (toLng - fromLng);

        this.droneCoordMap.push(new google.maps.LatLng(curLat, curLng));
      }
    }
    // Add coordinates for last marker in dronCoordMap
    this.droneCoordMap.push(
      new google.maps.LatLng(
        this.markers[this.markers.length - 1].position.lat(),
        this.markers[this.markers.length - 1].position.lng()
      )
    );
    this.totalRoute = 100 / this.droneCoordMap.length;

    this.simulateDrone(this.droneCoordMap, this.droneIdx, 20, this.droneRoute);
  }

  /**
   *
   * @param latlngs google.maps.LatLng[]
   * @param index number
   * @param wait number
   * @param line google.maps.Polyline
   * @returns void
   * @description Simulation of drone in map
   */
  simulateDrone(
    latlngs: google.maps.LatLng[],
    index: number,
    wait: number,
    line: google.maps.Polyline
  ): void {
    // if Simulateion paused, return
    if (this.pauseSimulation) {
      return;
    }
    /* if not last latlngs, then show drone movement based on percentage
       if last latlngs, then make drone offset 100% to complete traversal */
    if (index != latlngs.length - 1) {
      setTimeout(() => {
        const icons = line.get('icons');
        icons[0].offset = index * this.totalRoute + '%';
        line.set('icons', icons);
        this.droneIdx += 1;
        this.simulateDrone(latlngs, this.droneIdx, wait, line);
      }, wait);
    } else {
      const icons = line.get('icons');
      icons[0].offset = 100 + '%';
      this.enableSlider = false;
    }
  }

  /**
   * @returns void
   * @description Pause / Resume functionality
   */
  pauseOrResume(): void {
    this.pauseSimulation = !this.pauseSimulation;
    if (!this.pauseSimulation) {
      this.simulateDrone(
        this.droneCoordMap,
        this.droneIdx,
        20,
        this.droneRoute
      );
    }
  }

  /**
   * @returns void
   * @description Enable flag when user wants to make changes in the input
   */
  enableInputForm(): void {
    this.enableSimulationButton = false;
  }
}
