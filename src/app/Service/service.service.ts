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

  constructor() { }

  changeClientLogin(login: boolean){
    this.clientLogin.next(login);
    this.deliveryLogin.next(!login);
  }
  changeDeliveryLogin(login: boolean){
    this.deliveryLogin.next(login);
    this.clientLogin.next(!login);
  }

}
