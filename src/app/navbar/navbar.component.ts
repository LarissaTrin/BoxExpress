import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  clientLogin: boolean | undefined;
  deliveryLogin: boolean | undefined;
  
  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.currentClientLogin.subscribe(clientLogin => this.clientLogin = clientLogin);
    this.data.currentDeliveryLogin.subscribe(deliveryLogin => this.deliveryLogin = deliveryLogin);
  }

  ativarDelivery() {
    this.data.changeDeliveryLogin(true);
  }

  ativarCliente() {
    this.data.changeClientLogin(true);
  }
}
