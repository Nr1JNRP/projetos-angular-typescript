// 3.1 - contador de carrinho só com Signals, sem RxJS/Observable nenhum
import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';

export interface ItemCarrinho {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
}

@Component({
  selector: 'app-carrinho',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (item of itens(); track item.id) {
        <li>
          {{ item.nome }} - {{ item.quantidade }}x R$ {{ item.preco }}
          <button (click)="removerItem(item.id)">remover</button>
        </li>
      }
    </ul>
    <strong>Total: R$ {{ total() }}</strong>
  `,
})
export class CarrinhoComponent {
  readonly itens = signal<ItemCarrinho[]>([]);

  // computed já cuida de recalcular sozinho toda vez que "itens" mudar,
  // e só recalcula de verdade se algo que ele usa realmente mudou
  readonly total = computed(() =>
    this.itens().reduce((acc, item) => acc + item.quantidade * item.preco, 0)
  );

  readonly totalMudou = output<number>();

  constructor() {
    // effect roda automaticamente toda vez que "total" (que é lido aqui
    // dentro) mudar de valor - é o jeito mais direto de emitir o output
    // sempre que o total mudar, sem precisar chamar nada manualmente
    // nos métodos de adicionar/remover
    effect(() => {
      this.totalMudou.emit(this.total());
    });
  }

  adicionarItem(item: ItemCarrinho): void {
    this.itens.update((atual) => [...atual, item]);
  }

  removerItem(id: number): void {
    this.itens.update((atual) => atual.filter((item) => item.id !== id));
  }
}
