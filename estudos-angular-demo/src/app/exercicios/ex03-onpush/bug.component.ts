import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'app-ex03-bug',
  standalone: true,
  providers: [PessoaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p class="resultado">{{ texto || '(esperando resposta da "API"...)' }}</p>`,
})
export class Ex03BugComponent implements OnInit, OnDestroy {
  texto!: string;
  subscriptionBuscarPessoa!: Subscription;

  constructor(private readonly pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.subscriptionBuscarPessoa = this.pessoaService.buscarPorId(1).subscribe((pessoa) => {
      this.texto = `Nome: ${pessoa.nome}`;
      // repara: mesmo com o valor certinho aqui na classe, a tela
      // nunca atualiza, porque o componente é OnPush e ninguém avisou
      // o Angular que precisa re-renderizar
    });
  }

  ngOnDestroy(): void {
    this.subscriptionBuscarPessoa?.unsubscribe();
  }
}
