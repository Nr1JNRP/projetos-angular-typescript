import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { loadTodos, loadTodosError, loadTodosSuccess } from './actions';
import { Todo } from './models';

const TODOS_URL = '/api/todos'; // url fictícia (interceptada pelo todo-mock.interceptor pra essa demo)

@Injectable()
export class TodoEffects {
  readonly loadTodos$: Observable<ReturnType<typeof loadTodosSuccess | typeof loadTodosError>>;

  constructor(actions$: Actions, http: HttpClient) {
    // usando os parâmetros do construtor direto (por closure), sem
    // precisar de "this.algumaCoisa" - assim não depende de ordem
    // de inicialização de campo nenhuma
    this.loadTodos$ = createEffect(() =>
      actions$.pipe(
        ofType(loadTodos),
        switchMap(() =>
          http.get<Todo[]>(TODOS_URL).pipe(
            map((todos) => loadTodosSuccess({ todos })),
            catchError((error) =>
              of(loadTodosError({ error: error?.message ?? 'erro ao carregar as tarefas' }))
            )
          )
        )
      )
    );
  }
}
