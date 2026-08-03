import { fakeAsync, tick } from '@angular/core/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it('lista os usuários iniciais', fakeAsync(() => {
    let resultado: unknown[] = [];
    service.listar().subscribe((usuarios) => (resultado = usuarios));

    tick(500);

    expect(resultado.length).toBe(1);
  }));

  it('filtra por nome (case insensitive)', fakeAsync(() => {
    let resultado: { nome: string }[] = [];
    service.listar('GIANA').subscribe((usuarios) => (resultado = usuarios));

    tick(500);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe('Giana Sandrini');
  }));

  it('não retorna nada pra um termo que não bate com nenhum nome', fakeAsync(() => {
    let resultado: unknown[] = [];
    service.listar('zzz').subscribe((usuarios) => (resultado = usuarios));

    tick(500);

    expect(resultado).toHaveLength(0);
  }));

  it('cria um novo usuário e ele passa a aparecer na listagem', fakeAsync(() => {
    service
      .criar({
        nome: 'João Teste',
        email: 'joao@teste.com',
        cpf: '11144477735',
        telefone: '(11) 91234-5678',
        tipoTelefone: 'CELULAR',
      })
      .subscribe();
    tick(400);

    let resultado: unknown[] = [];
    service.listar().subscribe((usuarios) => (resultado = usuarios));
    tick(500);

    expect(resultado).toHaveLength(2);
  }));

  it('atualiza um usuário existente', fakeAsync(() => {
    let atualizado: { nome: string } | undefined;
    service
      .atualizar(1, {
        nome: 'Giana Sandrini Atualizada',
        email: 'giana@attornatus.com.br',
        cpf: '11144477735',
        telefone: '(11) 91234-5678',
        tipoTelefone: 'CELULAR',
      })
      .subscribe((usuario) => (atualizado = usuario));
    tick(400);

    expect(atualizado?.nome).toBe('Giana Sandrini Atualizada');
  }));

  it('emite erro quando simularErro está ligado', fakeAsync(() => {
    service.simularErro = true;
    let erro: unknown;

    service.listar().subscribe({ error: (e) => (erro = e) });
    tick(500);

    expect(erro).toBeInstanceOf(Error);
  }));
});
