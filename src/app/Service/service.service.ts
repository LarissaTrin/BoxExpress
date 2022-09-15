import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private clientLogin = new BehaviorSubject(true);
  currentClientLogin = this.clientLogin.asObservable();
  private deliveryLogin = new BehaviorSubject(false);
  currentDeliveryLogin = this.deliveryLogin.asObservable();

  private coord1 = new BehaviorSubject([0, 0]);
  currentCoord1 = this.coord1.asObservable();
  private coord2 = new BehaviorSubject([0, 0]);
  currentCoord2 = this.coord2.asObservable();

  constructor() { }

  changeClientLogin(login: boolean){
    this.clientLogin.next(login);
    this.deliveryLogin.next(!login);
  }
  changeDeliveryLogin(login: boolean){
    this.deliveryLogin.next(login);
    this.clientLogin.next(!login);
  }

  public changeCoord1(coord1: number[]){
    // console.log("OLA")
    this.coord1.next(coord1);
  }

  public changeCoord2(coord2: number[]){
    this.coord2.next(coord2);
  }
}
