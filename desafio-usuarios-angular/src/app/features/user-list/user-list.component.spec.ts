import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UsersService } from '../../core/services/users.service';
import { Usuario } from '../../core/models/usuario.model';

describe('UserListComponent', () => {
  let dialogMock: { open: jest.Mock };

  beforeEach(() => {
    dialogMock = { open: jest.fn() };
    TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [provideNoopAnimations()],
    });
    // MatDialogModule (importado pelo próprio UserListComponent) já
    // registra sua própria instância de MatDialog nos providers dele,
    // o que sobrescreve um mock passado via "providers" do TestBed.
    // overrideProvider força a substituição de verdade
    TestBed.overrideProvider(MatDialog, { useValue: dialogMock });
  });

  // o componente injeta o UsersStore no construtor, cujo próprio
  // construtor já dispara a busca inicial (debounce + delay) - por
  // isso o createComponent() também precisa estar dentro do fakeAsync,
  // senão o timer desse debounce fica "perdido" fora da zona fake
  function criarComponente(): ComponentFixture<UserListComponent> {
    return TestBed.createComponent(UserListComponent);
  }

  it('mostra loading e depois a lista de usuários', fakeAsync(() => {
    const fixture = criarComponente();
    const component = fixture.componentInstance;

    // loading fica true assim que a busca é disparada, antes mesmo do debounce
    expect(component.loading()).toBe(true);

    tick(300);
    tick(500);
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.usuarios()).toHaveLength(1);
  }));

  it('busca com debounce ao digitar', fakeAsync(() => {
    const fixture = criarComponente();
    const component = fixture.componentInstance;
    tick(300);
    tick(500);

    const service = TestBed.inject(UsersService);
    const spy = jest.spyOn(service, 'listar');

    component.busca.setValue('giana');
    tick(300);
    tick(500);

    expect(spy).toHaveBeenCalledWith('giana');
    expect(component.usuarios()).toHaveLength(1);
  }));

  it('mostra a mensagem de erro quando a busca falha', fakeAsync(() => {
    const fixture = criarComponente();
    const component = fixture.componentInstance;
    tick(300);
    tick(500);

    const service = TestBed.inject(UsersService);
    service.simularErro = true;

    component.busca.setValue('x');
    tick(300);
    tick(500);
    fixture.detectChanges();

    expect(component.error()).toContain('Não foi possível');
  }));

  it('abre o diálogo de novo usuário e cria ao fechar com dados', fakeAsync(() => {
    const fixture = criarComponente();
    const component = fixture.componentInstance;
    tick(300);
    tick(500);

    const novoUsuario = {
      nome: 'Novo',
      email: 'novo@x.com',
      cpf: '11144477735',
      telefone: '(11) 91234-5678',
      tipoTelefone: 'CELULAR',
    };
    dialogMock.open.mockReturnValue({ afterClosed: () => of(novoUsuario) });

    component.abrirNovoUsuario();
    tick(400); // criar()
    tick(500); // delay do refetch (recarregar() não passa pelo debounce)

    expect(dialogMock.open).toHaveBeenCalled();
    expect(component.usuarios()).toHaveLength(2);
  }));

  it('não faz nada se o diálogo de edição fechar sem dados (cancelar)', fakeAsync(() => {
    const fixture = criarComponente();
    const component = fixture.componentInstance;
    tick(300);
    tick(500);

    dialogMock.open.mockReturnValue({ afterClosed: () => of(undefined) });

    const usuario: Usuario = component.usuarios()[0];
    component.abrirEdicaoUsuario(usuario);
    tick(1000);

    expect(component.usuarios()).toHaveLength(1);
  }));
});
