import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { UserFormDialogComponent } from './user-form-dialog.component';
import { Usuario } from '../../core/models/usuario.model';

describe('UserFormDialogComponent', () => {
  let fixture: ComponentFixture<UserFormDialogComponent>;
  let component: UserFormDialogComponent;
  let dialogRefMock: { close: jest.Mock };

  function criarComponente(data: Usuario | null): void {
    dialogRefMock = { close: jest.fn() };

    TestBed.configureTestingModule({
      imports: [UserFormDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    });

    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('modo criação', () => {
    beforeEach(() => criarComponente(null));

    it('começa com o formulário vazio e inválido', () => {
      expect(component.modoEdicao).toBe(false);
      expect(component.form.invalid).toBe(true);
    });

    it('não fecha o diálogo se o formulário for salvo inválido', () => {
      component.salvar();
      expect(dialogRefMock.close).not.toHaveBeenCalled();
    });

    it('fecha o diálogo com os dados quando o formulário é válido', () => {
      component.form.setValue({
        email: 'teste@teste.com',
        nome: 'Fulano de Tal',
        cpf: '111.444.777-35',
        telefone: '(11) 91234-5678',
        tipoTelefone: 'CELULAR',
      });

      component.salvar();

      expect(dialogRefMock.close).toHaveBeenCalledWith(
        expect.objectContaining({ nome: 'Fulano de Tal' })
      );
    });

    it('revalida o telefone quando o tipo muda de celular pra fixo', () => {
      component.form.controls.telefone.setValue('(11) 91234-5678'); // 11 dígitos, válido só pra celular
      component.form.controls.tipoTelefone.setValue('FIXO');

      expect(component.form.controls.telefone.errors).toEqual({ telefoneInvalido: true });
    });

    it('fecha o diálogo sem dados ao cancelar', () => {
      component.cancelar();
      expect(dialogRefMock.close).toHaveBeenCalledWith();
    });
  });

  describe('modo edição', () => {
    const usuario: Usuario = {
      id: 5,
      nome: 'Giana Sandrini',
      email: 'giana@attornatus.com.br',
      cpf: '11144477735',
      telefone: '(11) 91234-5678',
      tipoTelefone: 'CELULAR',
    };

    beforeEach(() => criarComponente(usuario));

    it('preenche o formulário automaticamente com os dados do usuário', () => {
      expect(component.modoEdicao).toBe(true);
      expect(component.form.value.nome).toBe('Giana Sandrini');
      expect(component.form.value.email).toBe('giana@attornatus.com.br');
      expect(component.form.valid).toBe(true);
    });
  });
});
