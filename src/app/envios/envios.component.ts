import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mapService, Feature, MapboxOutput } from '../Service/mapService.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { Pedidos } from '../models/Pedidos';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit {

  public pedidoForm!: FormGroup;
  public addresses: string[] = [];
  public pedidoFeito: Pedidos = new Pedidos;
  selectedAddressRemetente = '';
  selectedAddressDestino = '';

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  click$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private mapBoxServ: mapService,
  ) {
    this.criarForm();
  }

  ngOnInit(): void {
  }

  criarForm () {
    this.pedidoForm = this.fb.group({
      id: [''],
      nomeRemetente: ['', Validators.required],
      nomeDestino: ['', Validators.required],
      pacotes: ['Quantidade de Pacotes', [Validators.required, Validators.maxLength(12)]],
      peso: ['Peso Total da Carga...', [Validators.required, Validators.maxLength(17)]],
      isCaixas: [false],
    });
  }

  pedidoSubmit() {
    console.log(this.pedidoForm?.value);


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

    // console.log(this.addresses);
  }

  onSelect(event: any, addressValue: boolean) {
    const address = event.target.value.toLowerCase();
    // console.log("OIII: ", address);
    this.mapBoxServ
      .search_coord(address)
      .subscribe((coord_feature: any) => {
        // console.log("vamos la: ",coord_feature);
        if (addressValue) {
          this.pedidoFeito.coordRemetente = coord_feature;
          this.pedidoFeito.enderecoRemetente = this.selectedAddressRemetente;
        } else {
          this.pedidoFeito.coordDestino = coord_feature;
          this.pedidoFeito.enderecoDestino = this.selectedAddressDestino;
        }
        console.log("pedidoFeito:  ",this.pedidoFeito);
        this.addresses = [];
    });
    // Rua Martins Ribeiro 12, Flamengo, Rio De Janeiro - Rio de Janeiro, 22231, Brazil
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
