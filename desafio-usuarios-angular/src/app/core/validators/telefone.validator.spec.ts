import { FormControl, FormGroup } from '@angular/forms';
import { telefoneValidator } from './telefone.validator';

function criarGrupo(telefone: string, tipoTelefone: string): FormGroup {
  const grupo = new FormGroup({
    telefone: new FormControl(telefone, telefoneValidator()),
    tipoTelefone: new FormControl(tipoTelefone),
  });

  // o FormControl calcula a validade na criação, antes de ter um pai
  // (o validator não consegue ler "tipoTelefone" nesse momento) -
  // então força um recálculo agora que o grupo já existe
  grupo.controls['telefone'].updateValueAndValidity({ onlySelf: true, emitEvent: false });

  return grupo;
}

describe('telefoneValidator', () => {
  it('aceita celular com 11 dígitos', () => {
    const grupo = criarGrupo('(11) 91234-5678', 'CELULAR');
    expect(grupo.controls['telefone'].errors).toBeNull();
  });

  it('rejeita celular com 10 dígitos (faltando o 9)', () => {
    const grupo = criarGrupo('(11) 1234-5678', 'CELULAR');
    expect(grupo.controls['telefone'].errors).toEqual({ telefoneInvalido: true });
  });

  it('aceita fixo com 10 dígitos', () => {
    const grupo = criarGrupo('(11) 1234-5678', 'FIXO');
    expect(grupo.controls['telefone'].errors).toBeNull();
  });

  it('rejeita fixo com 11 dígitos', () => {
    const grupo = criarGrupo('(11) 91234-5678', 'FIXO');
    expect(grupo.controls['telefone'].errors).toEqual({ telefoneInvalido: true });
  });

  it('deixa vazio passar', () => {
    const grupo = criarGrupo('', 'CELULAR');
    expect(grupo.controls['telefone'].errors).toBeNull();
  });
});
