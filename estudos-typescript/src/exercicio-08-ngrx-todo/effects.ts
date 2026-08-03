import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadTodos, loadTodosError, loadTodosSuccess } from './actions';
import { Todo } from './models';

const TODOS_URL = '/api/todos'; // url fictícia, back-end não existe de verdade

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      // switchMap pq se disparar loadTodos de novo antes da chamada
      // anterior terminar, cancela a antiga - não faz sentido ficar
      // com duas chamadas de "carregar tudo" correndo ao mesmo tempo
      switchMap(() =>
        this.http.get<Todo[]>(TODOS_URL).pipe(
          map((todos) => loadTodosSuccess({ todos })),
          // importante: o catchError tem que estar AQUI dentro do switchMap,
          // não no pipe de fora. se o erro escapar pro pipe externo, o
          // effect inteiro morre e para de reagir a qualquer ação depois disso
          catchError((error) =>
            of(loadTodosError({ error: error?.message ?? 'erro ao carregar as tarefas' }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}
