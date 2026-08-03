import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario, UsuarioForm } from '../models/usuario.model';

const USUARIOS_INICIAIS: Usuario[] = [
  {
    id: 1,
    nome: 'Giana Sandrini',
    email: 'giana@attornatus.com.br',
    cpf: '111.444.777-35',
    telefone: '(11) 91234-5678',
    tipoTelefone: 'CELULAR',
  },
];

// serviço mockado - num projeto real isso chamaria HttpClient pra uma
// API de verdade (json-server, MSW, etc). aqui é só um array em memória
// com delay() simulando latência de rede
@Injectable({ providedIn: 'root' })
export class UsersService {
  private usuarios: Usuario[] = [...USUARIOS_INICIAIS];
  private proximoId = 2;

  // liga isso pra simular uma falha de API (usado no teste de erro / demo)
  simularErro = false;

  listar(termo = ''): Observable<Usuario[]> {
    if (this.simularErro) {
      return throwError(() => new Error('falha simulada na API')).pipe(delay(500));
    }

    const termoNormalizado = termo.trim().toLowerCase();
    const filtrados = termoNormalizado
      ? this.usuarios.filter((u) => u.nome.toLowerCase().includes(termoNormalizado))
      : this.usuarios;

    return of([...filtrados]).pipe(delay(500));
  }

  criar(dados: UsuarioForm): Observable<Usuario> {
    const novo: Usuario = { ...dados, id: this.proximoId++ };
    this.usuarios = [...this.usuarios, novo];
    return of(novo).pipe(delay(400));
  }

  atualizar(id: number, dados: UsuarioForm): Observable<Usuario> {
    this.usuarios = this.usuarios.map((u) => (u.id === id ? { ...u, ...dados, id } : u));
    const atualizado = this.usuarios.find((u) => u.id === id);
    if (!atualizado) {
      return throwError(() => new Error(`usuário ${id} não encontrado`));
    }
    return of(atualizado).pipe(delay(400));
  }
}
