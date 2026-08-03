import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './models';

// 'todos' aqui é a chave que essa feature usa no state global
// (o nome tem que bater com o que for registrado no StoreModule.forFeature)
export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(selectTodoState, (state) => state.todos);

export const selectPendingTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => !todo.completo)
);
