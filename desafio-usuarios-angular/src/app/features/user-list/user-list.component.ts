import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersStore } from '../../core/state/users.store';
import { Usuario } from '../../core/models/usuario.model';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    UserCardComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  private readonly store = inject(UsersStore);
  private readonly dialog = inject(MatDialog);

  readonly usuarios = this.store.usuarios;
  readonly loading = this.store.loading;
  readonly error = this.store.error;

  readonly busca = new FormControl('', { nonNullable: true });

  constructor() {
    this.busca.valueChanges.pipe(takeUntilDestroyed()).subscribe((termo) => {
      this.store.buscar(termo);
    });
  }

  tentarNovamente(): void {
    this.store.buscar(this.busca.value);
  }

  abrirNovoUsuario(): void {
    const ref = this.dialog.open(UserFormDialogComponent, { width: '460px', data: null });
    ref.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.store.criar(resultado).subscribe();
      }
    });
  }

  abrirEdicaoUsuario(usuario: Usuario): void {
    const ref = this.dialog.open(UserFormDialogComponent, { width: '460px', data: usuario });
    ref.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.store.atualizar(usuario.id, resultado).subscribe();
      }
    });
  }
}
