import { environment } from 'src/environments/environment';
import { Component, AfterViewInit, Type } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private token = environment.mapbox.accessToken;


  constructor(
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-22.911077755911283, -43.236133510427784],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const routing = L.Routing.control({
      waypoints: [
        L.latLng(-22.911077755911283, -43.236133510427784),
        L.latLng(-22.933073257430088, -43.17908416158599)
    ],
  });

  routing.addTo(this.map);

  // var geocoder = L.Routing.geocoderElement();
  }
}
