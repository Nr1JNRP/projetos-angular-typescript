import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Exercicio {
  path: string;
  titulo: string;
  descricao: string;
}

const EXERCICIOS: Exercicio[] = [
  { path: 'ex01', titulo: '1.1 - Refatoração', descricao: 'tipagem, DRY e tratamento de erro' },
  { path: 'ex02', titulo: '1.2 - Generics', descricao: 'filtrarEPaginar<T> com paginação de verdade' },
  { path: 'ex03', titulo: '2.1 - OnPush', descricao: 'bug vs. corrigido, lado a lado' },
  { path: 'ex04', titulo: '2.2 - RxJS forkJoin', descricao: 'sem subscribe aninhado' },
  { path: 'ex05', titulo: '2.3 - busca com debounce', descricao: 'debounce, cancelamento e loading' },
  { path: 'ex06', titulo: '2.4 - trackBy', descricao: 'veja no console quem é recriado e quem não é' },
  { path: 'ex07', titulo: '3.1 - Signals', descricao: 'carrinho de compras reativo' },
  { path: 'ex08', titulo: '3.2 - NgRx', descricao: 'feature de To-do: actions, reducer, selectors, effect' },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>estudos-angular-demo</h2>
    <p>projeto com os exercícios rodando de verdade. escolhe um na barra do topo ou aqui embaixo.</p>
    <ul class="home-lista">
      @for (ex of exercicios; track ex.path) {
        <li>
          <a [routerLink]="ex.path"><strong>{{ ex.titulo }}</strong></a>
          — {{ ex.descricao }}
        </li>
      }
    </ul>
  `,
})
export class HomeComponent {
  readonly exercicios = EXERCICIOS;
}
