import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Usuario, UsuarioForm } from '../models/usuario.model';
import { UsersService } from '../services/users.service';

// estado da listagem centralizado aqui - Signals pro estado em si,
// RxJS só na parte que precisa de operadores assíncronos de verdade
// (debounce da busca + cancelamento de requisição anterior)
@Injectable({ providedIn: 'root' })
export class UsersStore {
  private readonly usersService = inject(UsersService);

  private readonly usuariosState = signal<Usuario[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  private readonly termoBusca$ = new Subject<string>();
  private termoAtual = '';

  readonly usuarios = this.usuariosState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  constructor() {
    this.termoBusca$
      .pipe(
        debounceTime(300),
        // evita refazer a mesma busca se o usuário digitar e voltar
        // pro mesmo termo rapidinho - só se aplica à digitação, o
        // recarregar() (usado depois de criar/editar) passa direto
        // por fora dessa pipeline, então não é afetado por isso
        distinctUntilChanged(),
        tap((termo) => (this.termoAtual = termo)),
        switchMap((termo) => this.executarBusca(termo)),
        takeUntilDestroyed()
      )
      .subscribe((usuarios) => this.usuariosState.set(usuarios));

    this.buscar('');
  }

  private executarBusca(termo: string): Observable<Usuario[]> {
    return this.usersService.listar(termo).pipe(
      catchError(() => {
        this.errorState.set('Não foi possível carregar os usuários. Tenta de novo.');
        return of<Usuario[]>([]);
      }),
      tap(() => this.loadingState.set(false))
    );
  }

  buscar(termo: string): void {
    this.loadingState.set(true);
    this.errorState.set(null);
    this.termoBusca$.next(termo);
  }

  // usado depois de criar/atualizar - precisa recarregar mesmo que o
  // termo de busca não tenha mudado, então não passa pelo
  // distinctUntilChanged (que bloquearia um termo repetido)
  private recarregar(): void {
    this.loadingState.set(true);
    this.errorState.set(null);
    this.executarBusca(this.termoAtual).subscribe((usuarios) => this.usuariosState.set(usuarios));
  }

  criar(dados: UsuarioForm): Observable<Usuario> {
    return this.usersService.criar(dados).pipe(tap(() => this.recarregar()));
  }

  atualizar(id: number, dados: UsuarioForm): Observable<Usuario> {
    return this.usersService.atualizar(id, dados).pipe(tap(() => this.recarregar()));
  }
}
