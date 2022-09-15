import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedidos } from '../models/Pedidos';
import { DataService } from '../Service/service.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  clientLogin: boolean | undefined;
  deliveryLogin: boolean | undefined;
  coord1: number[] = [];
  coord2: number[] = [];
  pedidos_service: any;
  pedidosList: Pedidos[] = [];
  numPedidos: number = 0;
  pedidoEscolhido: any;

  constructor(
    private data: DataService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.data.currentClientLogin.subscribe(clientLogin => this.clientLogin = clientLogin);
    this.data.currentDeliveryLogin.subscribe(deliveryLogin => this.deliveryLogin = deliveryLogin);

    this.data.currentPedidoEscolhido.subscribe(pedido => this.pedidoEscolhido = pedido);

    this.data.currentPedidos.subscribe(pedidos => {
      this.numPedidos = pedidos.length - 1;
      this.pedidos_service = pedidos
    });

    this.criaLista();
  }

  criaLista() {
    for (let i = 1; i < this.pedidos_service.length; i++) {
      this.pedidosList.push(this.pedidos_service[i]);
    }
    console.log("pedidosList: ", this.pedidosList)
  }

  entegaAceita(id: number) {
    this.data.changePedidoEscolhido(this.pedidosList[id-1]);
    this.router.navigate(['/rota']);
  }
}
