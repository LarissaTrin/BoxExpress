import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mapService, Feature, MapboxOutput } from '../Service/mapService.service';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit {

  public pedidoForm!: FormGroup;
  public addresses: string[] = [];
  public test: number[][] | undefined;
  selectedAddress: string | undefined;
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
      enderecoRemetente: ['', Validators.required],
      nomeDestino: ['', Validators.required],
      enderecoDestino: ['', Validators.required],
      pacotes: ['Quantidade de Pacotes', Validators.required],
      peso: ['Peso Total da Carga...', Validators.required],
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

    // console.log(this.addresses);
  }

  onSelect(event: any) {
    const address = event.target.value.toLowerCase();
    // console.log("OIII: ", address);
    this.selectedAddress = address;

    this.mapBoxServ
      .search_coord(address)
      .subscribe((coord_feature: any) => {
        console.log("vamos la: ",coord_feature);
        this.test = coord_feature;
    });

    // this.addresses = [];
    // Rua Martins Ribeiro 12, Flamengo, Rio De Janeiro - Rio de Janeiro, 22231, Brazil
  }
}
