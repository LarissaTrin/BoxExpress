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

  // Controle do preço
  private quilometro = new BehaviorSubject(0);
  currentQuilometro = this.quilometro.asObservable();
  private tempo = new BehaviorSubject(0);
  currentTempo = this.tempo.asObservable();
  private itens = new BehaviorSubject(0);
  currentItens = this.itens.asObservable();
  private preco = new BehaviorSubject('0.00');
  currentPreco = this.preco.asObservable();

  // Controle dos pedidos
  private pedidos = new BehaviorSubject([Pedidos]);
  currentPedidos = this.pedidos.asObservable();
  private pedidoEscolhido = new BehaviorSubject(Pedidos);
  currentPedidoEscolhido = this.pedidoEscolhido.asObservable();

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

  // Modificação dos preços
  public changeQuilometro(km: number){
    this.quilometro.next(km);
    // num.format('$0,0.00')
  }
  public changeTime(time: number){
    this.tempo.next(time);
  }
  public changeItens(itens: number){
    const km = Math.round(((this.quilometro.value / 1000) * 0.5) * 100) / 100
    this.itens.next(itens + km);
    this.preco.next(this.itens.value.toString());
  }

  // Modificação das rotas
  public changeCoord1(coord1: number[]){
    this.coord1.next(coord1);
  }
  public changeCoord2(coord2: number[]){
    this.coord2.next(coord2);
  }

  // Modificação dos Pedidos
  public changePedidos(pedido: any){
    this.pedidos.value.push(pedido);
  }
  public changePedidoEscolhido(pedido: any){
    this.pedidoEscolhido.next(pedido);
  }
}
