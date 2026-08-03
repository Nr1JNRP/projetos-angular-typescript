import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { todoReducer } from './exercicios/ex08-ngrx-todo/reducer';
import { TodoEffects } from './exercicios/ex08-ngrx-todo/effects';
import { todoMockInterceptor } from './exercicios/ex08-ngrx-todo/todo-mock.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([todoMockInterceptor])),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
  ],
};
