import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EnviosComponent } from './envios/envios.component';
import { PrecoComponent } from './preco/preco.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { RotaEntregaComponent } from './rota-entrega/rota-entrega.component';
import { DataService } from './Service/service.service';
import { MapRoutingComponent } from './map-routing/map-routing.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    NavbarComponent,
    EnviosComponent,
    PrecoComponent,
    PedidosComponent,
    RotaEntregaComponent,
    MapRoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [
    DataService,
    MapRoutingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
