import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ResultadoBusca {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class BuscaService {
  constructor(private readonly http: HttpClient) {}

  buscar(termo: string): Observable<ResultadoBusca[]> {
    return this.http.get<ResultadoBusca[]>(`/api/busca?q=${encodeURIComponent(termo)}`);
  }
}
