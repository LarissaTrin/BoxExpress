import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
