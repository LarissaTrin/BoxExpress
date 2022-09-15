import { environment } from 'src/environments/environment';
import { Component, AfterViewInit, Type, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { DataService } from '../Service/service.service';

@Component({
  selector: 'app-map-routing',
  templateUrl: './map-routing.component.html',
  styleUrls: ['./map-routing.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class MapRoutingComponent implements AfterViewInit {

  private map: any;
  private token = environment.mapbox.accessToken;

  private coord1: any;
  private coord2: any;

  ngOnInit(): void {

  }

  constructor(
    private mapaPlot: DataService,
  ) { }

  ngAfterViewInit(): void {
    this.mapaPlot.currentCoord1.subscribe(coord1 => this.coord1 = coord1);
    this.mapaPlot.currentCoord2.subscribe(coord2 => this.coord2 = coord2);
    // console.log("FOI?");
    // console.log("coord1: ", this.coord1);
    // console.log("coord2: ", this.coord2);
    // debugger;
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

    console.log();
    const routing = L.Routing.control({
        waypoints: [
          L.latLng(this.coord1[1], this.coord1[0]),
          L.latLng(this.coord2[1], this.coord2[0])
        ],
      });
    routing.addTo(this.map);
  }
}
