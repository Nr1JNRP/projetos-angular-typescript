export class Produto {
  constructor(
    public readonly id: number,
    public readonly descricao: string,
    public readonly quantidadeEstoque: number
  ) {}
}

export class Verdureira {
  private readonly produtos: Produto[] = [
    new Produto(1, 'Maçã', 20),
    new Produto(2, 'Laranja', 0),
    new Produto(3, 'Limão', 20),
  ];

  private findProduto(produtoId: number): Produto {
    const produto = this.produtos.find((p) => p.id === produtoId);
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
    return this.findProduto(produtoId).quantidadeEstoque > 0;
  }

  listar(): Produto[] {
    return [...this.produtos];
  }
}
