import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mapService, Feature, MapboxOutput } from '../Service/mapService.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { Pedidos } from '../models/Pedidos';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { DataService } from '../Service/service.service';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit {

  public pedidoForm!: FormGroup;
  public addresses: string[] = [];
  public pedidoFeito: Pedidos = new Pedidos;
  public pedidosFeitos: number = 0;
  selectedAddressRemetente = '';
  selectedAddressDestino = '';
  public isMapRouting = false;
  public km = 0;
  public preco = '';
  public isPreco = false;

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  click$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private mapBoxServ: mapService,
    private mapaPlot: DataService,
  ) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.mapaPlot.currentPedidos.subscribe(pedidos_service => this.pedidosFeitos = pedidos_service.length);
    this.mapaPlot.currentPreco.subscribe(preco => this.preco = preco);
    this.mapaPlot.currentQuilometro.subscribe(quilometro => this.km = quilometro);
    // this.mapaPlot.currentTempo.subscribe(tempo => this.time = tempo);
  }

  criarForm () {
    this.pedidoForm = this.fb.group({
      id: [''],
      nomeRemetente: ['', Validators.required],
      nomeDestino: ['', Validators.required],
      pacotes: ['Quantidade de Pacotes'],
      peso: ['Peso Total da Carga...', [Validators.required, Validators.maxLength(17)]],
      isCaixas: [false],
    });
  }

  precoPorItem() {
    let total = 0;
    const pesoItem = parseInt(this.pedidoForm.value.peso);
    this.km = this.km / 1000
    if (this.km < 50) {
      total = total + (10 * pesoItem)
    } else if (this.km < 150) {
      total = total + (13 * pesoItem)
    } else {
      total = total + (30 * pesoItem)
    }

    if (this.pedidoForm.value.isCaixas) {
      const pacotesItem = parseInt(this.pedidoForm.value.pacotes);
      total = total + (6 * pacotesItem)
    }

    this.isPreco = true;
    this.mapaPlot.changeItens(total);
  }

  pedidoSubmit() {
    this.pedidoFeito.nomeRemetente = this.pedidoForm.value.nomeRemetente;
    this.pedidoFeito.nomeDestino = this.pedidoForm.value.nomeDestino;
    this.pedidoFeito.isCaixas = this.pedidoForm.value.isCaixas;
    this.pedidoFeito.pacotes = parseInt(this.pedidoForm.value.pacotes);
    this.pedidoFeito.peso = parseInt(this.pedidoForm.value.peso);
    this.pedidoFeito.id = this.pedidosFeitos;

    this.mapaPlot.changePedidos(this.pedidoFeito);
    this.resetForm();
    ++this.pedidosFeitos;
  }

  resetForm() {
    this.criarForm();
    this.selectedAddressRemetente = '';
    this.selectedAddressDestino = '';
    this.pedidoFeito = new Pedidos;
    this.isMapRouting = false;
    this.isPreco = false;
  }

  checarRota() {
    this.mapaPlot.changeCoord1(this.pedidoFeito.coordRemetente);
    this.mapaPlot.changeCoord2(this.pedidoFeito.coordDestino);
    this.isMapRouting = true;
  }

  async search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapBoxServ
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features.map(feat => feat.place_name);
        });
    } else {
      this.addresses = [];
    }

    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    return merge(clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.addresses
        : this.addresses.filter(v => v.toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  onSelect(event: any, addressValue: boolean) {
    const address = event.target.value.toLowerCase();
    this.mapBoxServ
      .search_coord(address)
      .subscribe((coord_feature: any) => {
        if (addressValue) {
          this.pedidoFeito.coordRemetente = coord_feature;
          this.pedidoFeito.enderecoRemetente = this.selectedAddressRemetente;
        } else {
          this.pedidoFeito.coordDestino = coord_feature;
          this.pedidoFeito.enderecoDestino = this.selectedAddressDestino;
        }
        this.addresses = [];
    });
  }

  searchAutocompleted: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));

    return merge(debouncedText$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.addresses
        : this.addresses.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  };
}
