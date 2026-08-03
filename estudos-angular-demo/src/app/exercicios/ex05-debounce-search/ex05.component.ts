import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, tap } from 'rxjs';
import { BuscaService, ResultadoBusca } from './busca.service';

@Component({
  selector: 'app-ex05',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <h2>2.3 - busca com debounce</h2>
    <p>espera 500ms depois que você para de digitar, cancela busca anterior se digitar de novo.</p>

    <input [formControl]="termoControl" placeholder="digita 'ma', por exemplo..." />

    @if (loading$ | async) {
      <p>carregando...</p>
    }

    <ul>
      @for (item of resultados$ | async; track item.id) {
        <li>{{ item.nome }}</li>
      }
    </ul>
  `,
})
export class Ex05Component {
  readonly termoControl = new FormControl('', { nonNullable: true });
  readonly loading$ = new BehaviorSubject<boolean>(false);

  readonly resultados$ = this.termoControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap(() => this.loading$.next(true)),
    switchMap((termo) =>
      this.buscaService.buscar(termo).pipe(
        catchError(() => of<ResultadoBusca[]>([])),
        finalize(() => this.loading$.next(false))
      )
    )
  );

  constructor(private readonly buscaService: BuscaService) {}
}
