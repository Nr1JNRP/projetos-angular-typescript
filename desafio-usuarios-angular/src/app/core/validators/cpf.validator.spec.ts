import { FormControl } from '@angular/forms';
import { cpfValidator } from './cpf.validator';

describe('cpfValidator', () => {
  const validator = cpfValidator();

  it('aceita CPF válido (com formatação)', () => {
    const control = new FormControl('111.444.777-35');
    expect(validator(control)).toBeNull();
  });

  it('aceita CPF válido (só dígitos)', () => {
    const control = new FormControl('11144477735');
    expect(validator(control)).toBeNull();
  });

  it('rejeita CPF com dígito verificador errado', () => {
    const control = new FormControl('111.444.777-36');
    expect(validator(control)).toEqual({ cpfInvalido: true });
  });

  it('rejeita CPF com todos os dígitos iguais', () => {
    const control = new FormControl('111.111.111-11');
    expect(validator(control)).toEqual({ cpfInvalido: true });
  });

  it('rejeita CPF com tamanho errado', () => {
    const control = new FormControl('123456');
    expect(validator(control)).toEqual({ cpfInvalido: true });
  });

  it('deixa vazio passar (Validators.required cuida disso)', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });
});
