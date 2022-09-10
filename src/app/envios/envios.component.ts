import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit {

  public pedidoForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
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
}
