import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Todo } from './models';

// não existe back-end de verdade pra essa demo, então intercepto a
// chamada e devolvo dados mockados - o effects.ts continua chamando
// HttpClient normalmente, só a "rede" é que é fake aqui
const MOCK_TODOS: Todo[] = [
  { id: 1, titulo: 'Comprar café', completo: false },
  { id: 2, titulo: 'Revisar PR', completo: true },
  { id: 3, titulo: 'Estudar NgRx', completo: false },
  { id: 4, titulo: 'Arrumar o Wi-Fi', completo: true },
];

export const todoMockInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.endsWith('/api/todos') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_TODOS })).pipe(delay(700));
  }
  return next(req);
};
