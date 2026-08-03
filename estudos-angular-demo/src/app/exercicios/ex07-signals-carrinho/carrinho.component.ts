import { Component, computed, effect, output, signal } from '@angular/core';

export interface ItemCarrinho {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
}

let proximoId = 1;
const CATALOGO = [
  { nome: 'Maçã', preco: 3 },
  { nome: 'Banana', preco: 2 },
  { nome: 'Uva', preco: 8 },
];

@Component({
  selector: 'app-ex07',
  standalone: true,
  template: `
    <h2>3.1 - carrinho com Signals</h2>

    <div>
      @for (produto of catalogo; track produto.nome) {
        <button (click)="adicionarItem(produto)">+ {{ produto.nome }} (R$ {{ produto.preco }})</button>
      }
    </div>

    <ul>
      @for (item of itens(); track item.id) {
        <li>
          {{ item.nome }} - {{ item.quantidade }}x R$ {{ item.preco }} = R$
          {{ item.quantidade * item.preco }}
          <button (click)="removerItem(item.id)">remover</button>
        </li>
      }
    </ul>

    <strong>Total: R$ {{ total() }}</strong>
    <p><i>o output "totalMudou" dispara toda vez que o total muda - olha o console</i></p>
  `,
})
export class Ex07Component {
  readonly catalogo = CATALOGO;
  readonly itens = signal<ItemCarrinho[]>([]);

  readonly total = computed(() =>
    this.itens().reduce((acc, item) => acc + item.quantidade * item.preco, 0)
  );

  readonly totalMudou = output<number>();

  constructor() {
    effect(() => {
      this.totalMudou.emit(this.total());
      console.log('totalMudou:', this.total());
    });
  }

  adicionarItem(produto: { nome: string; preco: number }): void {
    this.itens.update((atual) => {
      const existente = atual.find((i) => i.nome === produto.nome);
      if (existente) {
        return atual.map((i) =>
          i.id === existente.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...atual, { id: proximoId++, nome: produto.nome, preco: produto.preco, quantidade: 1 }];
    });
  }

  removerItem(id: number): void {
    this.itens.update((atual) => atual.filter((item) => item.id !== id));
  }
}
