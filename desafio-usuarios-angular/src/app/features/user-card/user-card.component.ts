import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input({ required: true }) usuario!: Usuario;
  @Output() editar = new EventEmitter<Usuario>();
}
