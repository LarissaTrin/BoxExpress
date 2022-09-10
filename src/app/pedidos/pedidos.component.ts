import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/service.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  clientLogin: boolean | undefined;
  deliveryLogin: boolean | undefined;
  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.currentClientLogin.subscribe(clientLogin => this.clientLogin = clientLogin);
    this.data.currentDeliveryLogin.subscribe(deliveryLogin => this.deliveryLogin = deliveryLogin);
  }

}
