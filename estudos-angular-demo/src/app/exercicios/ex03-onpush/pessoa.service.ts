import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class PessoaService {
  /** Mock de uma busca em API com retorno em 1.5 segundos (mais lento de propósito, pra dar pra ver o efeito) */
  buscarPorId(id: number) {
    return of({ id, nome: 'João' }).pipe(delay(1500));
  }
}
