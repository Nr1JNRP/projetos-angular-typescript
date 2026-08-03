import { Component, OnDestroy, signal } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PessoaFamiliaService } from './pessoa-familia.service';

@Component({
  selector: 'app-ex04',
  standalone: true,
  providers: [PessoaFamiliaService],
  template: `
    <h2>2.2 - forkJoin (sem subscribe aninhado)</h2>
    <p>
      as duas chamadas (800ms e 1200ms) disparam juntas - o resultado sai em ~1.2s, não 2s como
      seria se fosse uma esperando a outra.
    </p>
    <button (click)="buscar()" [disabled]="carregando()">buscar</button>

    @if (carregando()) {
      <p>carregando...</p>
    }
    @if (texto()) {
      <p class="resultado">{{ texto() }}</p>
    }
  `,
})
export class Ex04Component implements OnDestroy {
  texto = signal('');
  carregando = signal(false);

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly service: PessoaFamiliaService) {}

  buscar(): void {
    this.carregando.set(true);
    this.texto.set('');

    forkJoin({
      pessoa: this.service.buscarPorId(1),
      qtd: this.service.buscarQuantidadeFamiliares(1),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ pessoa, qtd }) => {
        this.texto.set(`Nome: ${pessoa.nome} | familiares: ${qtd}`);
        this.carregando.set(false);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
