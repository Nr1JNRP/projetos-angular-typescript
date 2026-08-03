import { Component, signal } from '@angular/core';
import { Ex03BugComponent } from './bug.component';
import { Ex03FixComponent } from './fix.component';

@Component({
  selector: 'app-ex03',
  standalone: true,
  imports: [Ex03BugComponent, Ex03FixComponent],
  template: `
    <h2>2.1 - OnPush change detection</h2>
    <p>
      os dois esperam 1.5s numa chamada mockada. o de cima é o código original (nunca mostra o
      nome), o de baixo é a correção com <code>markForCheck()</code>.
    </p>

    <div class="lado-a-lado">
      <section>
        <h3>❌ com bug</h3>
        @if (mostrarBug()) {
          <app-ex03-bug />
        }
        <button (click)="recriarBug()">recarregar</button>
      </section>

      <section>
        <h3>✅ corrigido</h3>
        @if (mostrarFix()) {
          <app-ex03-fix />
        }
        <button (click)="recriarFix()">recarregar</button>
      </section>
    </div>
  `,
})
export class Ex03Component {
  mostrarBug = signal(true);
  mostrarFix = signal(true);

  recriarBug(): void {
    this.mostrarBug.set(false);
    setTimeout(() => this.mostrarBug.set(true));
  }

  recriarFix(): void {
    this.mostrarFix.set(false);
    setTimeout(() => this.mostrarFix.set(true));
  }
}
