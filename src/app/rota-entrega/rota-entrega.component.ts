import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../models/Pedidos';
import { DataService } from '../Service/service.service';

@Component({
  selector: 'app-rota-entrega',
  templateUrl: './rota-entrega.component.html',
  styleUrls: ['./rota-entrega.component.scss']
})
export class RotaEntregaComponent implements OnInit {

  viagem = false;
  remetente = false;
  destinatario = false;
  pedidoEscolhido: any;
  coordInicial: number[] = [];
  coord1: number[] = [];
  coord2: number[] = [];

  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.currentPedidoEscolhido.subscribe(pedido => this.pedidoEscolhido = pedido);
    this.coordInicial = [-43.236133510427784, -22.911077755911283];
    this.coord1 = Object.assign([], this.pedidoEscolhido.coordRemetente);
    this.coord2 = Object.assign([], this.pedidoEscolhido.coordDestino);
  }

  comecarViagem() {
    if (!this.remetente) {
      this.data.changeCoord1(this.coordInicial);
      this.data.changeCoord2(this.coord1);
    } else {
      this.data.changeCoord1(this.coord1);
      this.data.changeCoord2(this.coord2);
    }
    this.viagem = !this.viagem;
  }

  trocaEndereco() {
    if (!this.remetente) {
      this.remetente = !this.remetente;
      this.comecarViagem();
    } else {
      this.destinatario = !this.destinatario;
    }
  }
}
