import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { cpfValidator } from '../../core/validators/cpf.validator';
import { telefoneValidator } from '../../core/validators/telefone.validator';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.css',
})
export class UserFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UserFormDialogComponent>);
  readonly usuario = inject<Usuario | null>(MAT_DIALOG_DATA);

  readonly modoEdicao = this.usuario !== null;

  readonly form = this.fb.nonNullable.group({
    email: [this.usuario?.email ?? '', [Validators.required, Validators.email]],
    nome: [this.usuario?.nome ?? '', Validators.required],
    cpf: [this.usuario?.cpf ?? '', [Validators.required, cpfValidator()]],
    telefone: [this.usuario?.telefone ?? '', [Validators.required, telefoneValidator()]],
    tipoTelefone: [this.usuario?.tipoTelefone ?? ('CELULAR' as const), Validators.required],
  });

  constructor() {
    // o FormControl "telefone" calcula sua validade quando é CRIADO,
    // e nesse momento ele ainda não tem o FormGroup pai (o validator
    // não consegue ler o "tipoTelefone" ainda) - por isso força um
    // recálculo agora que o form já está montado
    this.form.controls.telefone.updateValueAndValidity({ onlySelf: true, emitEvent: false });

    // e quando o tipo de telefone muda depois, revalida de novo (o
    // Angular não faz isso sozinho pra campos irmãos)
    this.form.controls.tipoTelefone.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.form.controls.telefone.updateValueAndValidity();
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
