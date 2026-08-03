// 2.3 - campo de busca com debounce, cancelando requisição anterior
// e mostrando loading, sem vazar memória
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, tap } from 'rxjs';
import { BuscaService, ResultadoBusca } from './busca.service';

@Component({
  selector: 'app-busca',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './busca.component.html',
})
export class BuscaComponent {
  readonly termoControl = new FormControl('', { nonNullable: true });
  readonly loading$ = new BehaviorSubject<boolean>(false);

  readonly resultados$ = this.termoControl.valueChanges.pipe(
    debounceTime(500), // espera parar de digitar por 500ms antes de fazer qualquer coisa
    distinctUntilChanged(), // se digitar e apagar e voltar pro mesmo termo, não busca de novo à toa
    tap(() => this.loading$.next(true)),
    switchMap((termo) =>
      this.buscaService.buscar(termo).pipe(
        // switchMap já cancela a requisição anterior sozinho se um novo
        // termo chegar antes dela terminar - resolve a race condition
        // sem precisar de mais nada
        catchError(() => of<ResultadoBusca[]>([])),
        finalize(() => this.loading$.next(false))
      )
    )
  );
  // não precisei de takeUntil/destroy$ aqui porque o async pipe no
  // template já cancela a subscription sozinho quando o componente morre

  constructor(private readonly buscaService: BuscaService) {}
}
