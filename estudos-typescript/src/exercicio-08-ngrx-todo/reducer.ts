import { createReducer, on } from '@ngrx/store';
import { loadTodos, loadTodosError, loadTodosSuccess, toggleTodoComplete } from './actions';
import { initialTodoState, TodoState } from './models';

export const todoReducer = createReducer(
  initialTodoState,

  on(
    loadTodos,
    (state): TodoState => ({ ...state, loading: true, error: null })
  ),

  on(
    loadTodosSuccess,
    (state, { todos }): TodoState => ({ ...state, todos, loading: false })
  ),

  on(
    loadTodosError,
    (state, { error }): TodoState => ({ ...state, loading: false, error })
  ),

  // toggle é local, não precisa de loading/error - só espelha o
  // estado atual trocando o "completo" do item certo, sem mutar nada
  on(
    toggleTodoComplete,
    (state, { id }): TodoState => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completo: !todo.completo } : todo
      ),
    })
  )
);
