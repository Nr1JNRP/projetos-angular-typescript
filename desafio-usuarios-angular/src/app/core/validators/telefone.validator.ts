import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// valida o telefone considerando o campo irmão "tipoTelefone" no mesmo
// FormGroup - celular tem 11 dígitos (com o 9), fixo tem 10
export function telefoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = (control.value ?? '').replace(/\D/g, '');

    if (!valor) {
      return null;
    }

    const tipo = control.parent?.get('tipoTelefone')?.value;
    const tamanhoEsperado = tipo === 'FIXO' ? 10 : 11;

    if (valor.length !== tamanhoEsperado) {
      return { telefoneInvalido: true };
    }

    return null;
  };
}
