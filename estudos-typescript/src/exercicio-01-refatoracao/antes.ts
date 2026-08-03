// código original, como veio no exercício
class Produto {
  id: any;
  descricao: any;
  quantidadeEstoque: any;
  constructor(id: any, descricao: any, quantidadeEstoque: any) {
    this.id = id;
    this.descricao = descricao;
    this.quantidadeEstoque = quantidadeEstoque;
  }
}

class Verdureira {
  produtos: any;
  constructor() {
    this.produtos = [
      new Produto(1, 'Maçã', 20),
      new Produto(2, 'Laranja', 0),
      new Produto(3, 'Limão', 20),
    ];
  }

  getDescricaoProduto(produtoId: any) {
    let produto;
    for (let index = 0; index < this.produtos.length; index++) {
      if (this.produtos[index].id == produtoId) {
        produto = this.produtos[index];
      }
    }
    return produto.id + ' - ' + produto.descricao + ' (' + produto.quantidadeEstoque + 'x)';
  }

  hasEstoqueProduto(produtoId: any) {
    let produto;
    for (let index = 0; index < this.produtos.length; index++) {
      if (this.produtos[index].id == produtoId) {
        produto = this.produtos[index];
      }
    }
    if (produto.quantidadeEstoque > 0) {
      return true;
    } else {
      return false;
    }
  }
}

// isso aqui é só pra virar um module de verdade e não bagunçar com o
// depois.ts (sem import/export os dois ficam no mesmo escopo global)
export {};
