import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserCardComponent } from './user-card.component';
import { Usuario } from '../../core/models/usuario.model';

describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;

  const usuario: Usuario = {
    id: 1,
    nome: 'Giana Sandrini',
    email: 'giana@attornatus.com.br',
    cpf: '11144477735',
    telefone: '(11) 91234-5678',
    tipoTelefone: 'CELULAR',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [UserCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(UserCardComponent);
    fixture.componentInstance.usuario = usuario;
    fixture.detectChanges();
  });

  it('mostra o nome e o e-mail do usuário', () => {
    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texto).toContain('Giana Sandrini');
    expect(texto).toContain('giana@attornatus.com.br');
  });

  it('emite "editar" com o usuário ao clicar no botão', () => {
    const spy = jest.fn();
    fixture.componentInstance.editar.subscribe(spy);

    const botao = fixture.debugElement.query(By.css('button'));
    botao.triggerEventHandler('click');

    expect(spy).toHaveBeenCalledWith(usuario);
  });
});
