// refatorei tirando os "any" e a duplicação de código que tinha no original
class Produto {
  // usando parameter properties do TS pra não ficar repetindo
  // "this.x = x" pra cada campo no construtor. E readonly porque
  // não faz sentido um produto trocar de id depois de criado
  constructor(
    public readonly id: number,
    public readonly descricao: string,
    public readonly quantidadeEstoque: number
  ) {}
}

class Verdureira {
  private readonly produtos: Produto[] = [
    new Produto(1, 'Maçã', 20),
    new Produto(2, 'Laranja', 0),
    new Produto(3, 'Limão', 20),
  ];

  // os dois métodos de baixo tavam com o mesmo for duplicado pra
  // achar o produto pelo id, então joguei isso pra cá. se um dia
  // trocar pra Map/banco de dados, só mexe aqui
  private findProduto(produtoId: number): Produto {
    const produto = this.produtos.find((p) => p.id === produtoId);

    // no original, se não achasse o produto ele quebrava lá na frente
    // com "cannot read property of undefined". melhor already avisar
    // o que rolou
    if (!produto) {
      throw new Error(`Produto com id ${produtoId} não encontrado`);
    }

    return produto;
  }

  getDescricaoProduto(produtoId: number): string {
    const produto = this.findProduto(produtoId);
    return `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`;
  }

  hasEstoqueProduto(produtoId: number): boolean {
    // era um if/else só pra devolver true ou false, dava pra
    // simplificar pra uma linha só
    return this.findProduto(produtoId).quantidadeEstoque > 0;
  }
}

// só pra dar uma testada rápida
const verdureira = new Verdureira();
console.log(verdureira.getDescricaoProduto(1));
console.log('tem estoque de laranja?', verdureira.hasEstoqueProduto(2));

export {};
