import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class PessoaFamiliaService {
  buscarPorId(id: number) {
    return of({ id, nome: 'Maria' }).pipe(delay(800));
  }

  buscarQuantidadeFamiliares(id: number) {
    return of(3).pipe(delay(1200));
  }
}
