import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UsersStore } from './users.store';
import { UsersService } from '../services/users.service';

describe('UsersStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  // importante: o store é injetado DENTRO do fakeAsync em cada teste.
  // o construtor dele já dispara uma busca (debounce + delay do
  // service), e se ele fosse criado fora da zona fake (ex: num
  // beforeEach normal) esse timer ficaria "perdido" e o tick() daqui
  // de dentro nunca ia avançar ele

  it('carrega a lista inicial ao ser criado', fakeAsync(() => {
    const store = TestBed.inject(UsersStore);

    tick(300); // debounce
    tick(500); // delay do service

    expect(store.usuarios().length).toBe(1);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  }));

  it('fica em loading enquanto a busca está em andamento', fakeAsync(() => {
    const store = TestBed.inject(UsersStore);
    tick(300);
    tick(500);

    store.buscar('gia');
    tick(300); // só o debounce passou, a chamada ainda não respondeu
    expect(store.loading()).toBe(true);

    tick(500);
    expect(store.loading()).toBe(false);
    expect(store.usuarios()).toHaveLength(1);
  }));

  it('não dispara uma busca pra cada tecla digitada (debounce de 300ms)', fakeAsync(() => {
    const store = TestBed.inject(UsersStore);
    tick(300);
    tick(500);

    const service = TestBed.inject(UsersService);
    const spy = jest.spyOn(service, 'listar');

    store.buscar('g');
    tick(100);
    store.buscar('gi');
    tick(100);
    store.buscar('gia');
    tick(300); // só agora o debounce completa, contando a partir do último termo
    tick(500);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('gia');
  }));

  it('define o erro quando o service falha, e não deixa o loading travado', fakeAsync(() => {
    const store = TestBed.inject(UsersStore);
    tick(300);
    tick(500);

    const service = TestBed.inject(UsersService);
    service.simularErro = true;

    store.buscar('qualquer coisa');
    tick(300);
    tick(500);

    expect(store.error()).toContain('Não foi possível');
    expect(store.loading()).toBe(false);
  }));

  it('depois de criar um usuário, a lista é atualizada', fakeAsync(() => {
    const store = TestBed.inject(UsersStore);
    tick(300);
    tick(500);

    store
      .criar({
        nome: 'Novo Usuário',
        email: 'novo@teste.com',
        cpf: '11144477735',
        telefone: '(11) 91234-5678',
        tipoTelefone: 'CELULAR',
      })
      .subscribe();
    tick(400); // criar()
    tick(500); // delay do refetch (recarregar() não passa pelo debounce)

    expect(store.usuarios()).toHaveLength(2);
  }));
});
