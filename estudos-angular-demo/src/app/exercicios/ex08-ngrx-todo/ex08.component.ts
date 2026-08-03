import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTodos, toggleTodoComplete } from './actions';
import { selectAllTodos, selectPendingTodos } from './selectors';

@Component({
  selector: 'app-ex08',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h2>3.2 - NgRx To-do</h2>
    <button (click)="carregar()">recarregar (loadTodos)</button>

    @if (todos$ | async; as todos) {
      <h3>todas ({{ todos.length }})</h3>
      <ul>
        @for (todo of todos; track todo.id) {
          <li [class.completo]="todo.completo">
            <label>
              <input type="checkbox" [checked]="todo.completo" (change)="toggle(todo.id)" />
              {{ todo.titulo }}
            </label>
          </li>
        }
      </ul>
    } @else {
      <p>carregando...</p>
    }

    @if (pendentes$ | async; as pendentes) {
      <h3>pendentes ({{ pendentes.length }})</h3>
      <ul>
        @for (todo of pendentes; track todo.id) {
          <li>{{ todo.titulo }}</li>
        }
      </ul>
    }
  `,
})
export class Ex08Component implements OnInit {
  private readonly store = inject(Store);

  readonly todos$ = this.store.select(selectAllTodos);
  readonly pendentes$ = this.store.select(selectPendingTodos);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.store.dispatch(loadTodos());
  }

  toggle(id: number): void {
    this.store.dispatch(toggleTodoComplete({ id }));
  }
}
