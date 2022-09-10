import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rota-entrega',
  templateUrl: './rota-entrega.component.html',
  styleUrls: ['./rota-entrega.component.scss']
})
export class RotaEntregaComponent implements OnInit {

  viagem = false;
  remetente = false;
  destinatario = false;
  constructor() { }

  ngOnInit(): void {
  }

  comecarViagem() {
    this.viagem = !this.viagem;
  }

  trocaEndereco() {
    if (!this.remetente) {
      console.log("TEST");
      this.remetente = !this.remetente;
      this.comecarViagem();
    } else {
      this.destinatario = !this.destinatario;
    }
  }
}
