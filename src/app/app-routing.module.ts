import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnviosComponent } from './envios/envios.component';
import { HomeComponent } from './home/home.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PrecoComponent } from './preco/preco.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'envios', component: EnviosComponent},
  {path: 'preco', component: PrecoComponent},
  {path: 'pedidos', component: PedidosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
