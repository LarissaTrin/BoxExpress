export class Pedidos {
  constructor() {
      this.id = 0;
      this.nomeRemetente = '';
      this.enderecoRemetente = '';
      this.coordRemetente = [0, 0];
      this.nomeDestino = '';
      this.enderecoDestino = '';
      this.coordDestino = [0, 0];
      this.pacotes = '';
      this.peso = '';
      this.isCaixas = false;
  }
  id: number;
  nomeRemetente: string;
  enderecoRemetente: string;
  coordRemetente: number[];
  nomeDestino: string;
  enderecoDestino: string;
  coordDestino: number[];
  pacotes: string;
  peso: string;
  isCaixas: boolean;
}
