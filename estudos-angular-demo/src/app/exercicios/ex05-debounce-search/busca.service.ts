import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ResultadoBusca {
  id: number;
  nome: string;
}

const DADOS: ResultadoBusca[] = [
  { id: 1, nome: 'Maçã' },
  { id: 2, nome: 'Banana' },
  { id: 3, nome: 'Laranja' },
  { id: 4, nome: 'Uva' },
  { id: 5, nome: 'Manga' },
  { id: 6, nome: 'Melancia' },
  { id: 7, nome: 'Maracujá' },
];

@Injectable({ providedIn: 'root' })
export class BuscaService {
  // num app de verdade isso chamaria this.http.get(...) - aqui simulei
  // a latência de rede com delay() pra dar pra ver o loading e o debounce
  buscar(termo: string): Observable<ResultadoBusca[]> {
    const resultado = DADOS.filter((d) => d.nome.toLowerCase().includes(termo.toLowerCase()));
    return of(resultado).pipe(delay(600));
  }
}
