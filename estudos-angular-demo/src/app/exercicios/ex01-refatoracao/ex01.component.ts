import { Component } from '@angular/core';
import { Verdureira } from './produto';

@Component({
  selector: 'app-ex01',
  standalone: true,
  template: `
    <h2>1.1 - Refatoração (Produto/Verdureira)</h2>
    <ul>
      @for (produto of produtos; track produto.id) {
        <li>
          {{ verdureira.getDescricaoProduto(produto.id) }} — tem estoque?
          {{ verdureira.hasEstoqueProduto(produto.id) ? 'sim' : 'não' }}
        </li>
      }
    </ul>
  `,
})
export class Ex01Component {
  readonly verdureira = new Verdureira();
  readonly produtos = this.verdureira.listar();
}
