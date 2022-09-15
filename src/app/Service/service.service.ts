import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pedidos } from '../models/Pedidos';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Controle de login
  private clientLogin = new BehaviorSubject(true);
  currentClientLogin = this.clientLogin.asObservable();
  private deliveryLogin = new BehaviorSubject(false);
  currentDeliveryLogin = this.deliveryLogin.asObservable();

  // Controle das rotas
  private coord1 = new BehaviorSubject([0, 0]);
  currentCoord1 = this.coord1.asObservable();
  private coord2 = new BehaviorSubject([0, 0]);
  currentCoord2 = this.coord2.asObservable();

  // Controle dos pedidos
  private pedidos = new BehaviorSubject([Pedidos]);
  currentPedidos = this.pedidos.asObservable();

  constructor() { }

  // Modificação de login
  changeClientLogin(login: boolean){
    this.clientLogin.next(login);
    this.deliveryLogin.next(!login);
  }
  changeDeliveryLogin(login: boolean){
    this.deliveryLogin.next(login);
    this.clientLogin.next(!login);
  }

  // Modificação das rotas
  public changeCoord1(coord1: number[]){
    // console.log("OLA")
    this.coord1.next(coord1);
  }
  public changeCoord2(coord2: number[]){
    this.coord2.next(coord2);
  }

  // Modificação dos Pedidos
  public changePedidos(pedido: any){
    // console.log("pedido: ", pedido);
    // console.log("pedidos.value: ", this.pedidos.value);
    this.pedidos.value.push(pedido);
    // console.log("Final  pedidos.value: ", this.pedidos.value);
  }
}
