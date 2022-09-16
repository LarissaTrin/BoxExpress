export class Pedidos {
  constructor() {
      this.id = 0;
      this.nomeRemetente = '';
      this.enderecoRemetente = '';
      this.coordRemetente = [0, 0];
      this.nomeDestino = '';
      this.enderecoDestino = '';
      this.coordDestino = [0, 0];
      this.pacotes = 0;
      this.peso = 0;
      this.isCaixas = false;
      this.preco = '';
  }

  id: number;
  nomeRemetente: string;
  enderecoRemetente: string;
  coordRemetente: number[];
  nomeDestino: string;
  enderecoDestino: string;
  coordDestino: number[];
  pacotes: number;
  peso: number;
  isCaixas: boolean;
  preco: string;
}
