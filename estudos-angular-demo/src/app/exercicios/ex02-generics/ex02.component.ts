import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filtrarEPaginar } from './paginacao';

interface Usuario {
  id: number;
  nome: string;
  ativo: boolean;
}

const USUARIOS: Usuario[] = [
  { id: 1, nome: 'Ana Silva', ativo: true },
  { id: 2, nome: 'Bruno Costa', ativo: true },
  { id: 3, nome: 'Ana Paula', ativo: false },
  { id: 4, nome: 'Carlos Souza', ativo: true },
  { id: 5, nome: 'Ana Beatriz', ativo: true },
  { id: 6, nome: 'Diego Lima', ativo: true },
  { id: 7, nome: 'Ana Clara', ativo: true },
];

@Component({
  selector: 'app-ex02',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>1.2 - Generics: filtrarEPaginar&lt;T&gt;</h2>
    <input
      [(ngModel)]="termo"
      (ngModelChange)="paginaAtual = 1"
      placeholder="filtrar por nome (tenta 'ana')..."
    />

    @if (getPagina(); as pagina) {
      <ul>
        @for (u of pagina.itens; track u.id) {
          <li>{{ u.nome }} {{ u.ativo ? '' : '(inativo)' }}</li>
        }
      </ul>

      <button (click)="paginaAtual = paginaAtual - 1" [disabled]="paginaAtual <= 1">
        anterior
      </button>
      página {{ paginaAtual }} de {{ pagina.totalPaginas }}
      <button
        (click)="paginaAtual = paginaAtual + 1"
        [disabled]="paginaAtual >= pagina.totalPaginas"
      >
        próxima
      </button>
      <p>total filtrado: {{ pagina.total }}</p>
    }
  `,
})
export class Ex02Component {
  termo = '';
  paginaAtual = 1;
  readonly tamanho = 2;

  getPagina() {
    return filtrarEPaginar(
      USUARIOS,
      (u) => u.nome.toLowerCase().includes(this.termo.toLowerCase()),
      { pagina: this.paginaAtual, tamanho: this.tamanho }
    );
  }
}
