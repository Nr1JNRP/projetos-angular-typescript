import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function calcularDigitoVerificador(base: number[]): number {
  let peso = base.length + 1;
  const soma = base.reduce((acc, digito) => acc + digito * peso--, 0);
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = (control.value ?? '').replace(/\D/g, '');

    if (!valor) {
      return null; // campo vazio é problema do Validators.required, não daqui
    }

    // CPFs tipo 111.111.111-11 passam na conta mas não existem
    if (valor.length !== 11 || /^(\d)\1{10}$/.test(valor)) {
      return { cpfInvalido: true };
    }

    const digitos = valor.split('').map(Number);
    const digito1 = calcularDigitoVerificador(digitos.slice(0, 9));
    const digito2 = calcularDigitoVerificador(digitos.slice(0, 10));

    if (digito1 !== digitos[9] || digito2 !== digitos[10]) {
      return { cpfInvalido: true };
    }

    return null;
  };
}
