import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  center: number[];
}

export interface Position {
  longitude: number;
  latitude: number;
};

@Injectable({
  providedIn: 'root'
})
export class mapService {

  private token = environment.mapbox.accessToken;

  constructor(private http: HttpClient) { }

  search_word(query: String) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?types=address&access_token='
    + this.token).pipe(map((res: any) => {
      // console.log("ola : ", res)
      return res.features;
    }));
  }

  search_coord(query: String) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?types=address&access_token='
    + this.token).pipe(map((res: any) => {
      console.log("TO AQUI: ", res.features[0])
      return res.features[0].center;
    }));
  }

  // Rua Martins Ribeiro 12, Flamengo, Rio De Janeiro - Rio de Janeiro, 22231, Brazil
}

