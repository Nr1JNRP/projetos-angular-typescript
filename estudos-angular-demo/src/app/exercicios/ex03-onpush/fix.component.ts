import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'app-ex03-fix',
  standalone: true,
  providers: [PessoaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p class="resultado">{{ texto || '(esperando resposta da "API"...)' }}</p>`,
})
export class Ex03FixComponent implements OnInit, OnDestroy {
  texto!: string;
  subscriptionBuscarPessoa!: Subscription;

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptionBuscarPessoa = this.pessoaService.buscarPorId(1).subscribe((pessoa) => {
      this.texto = `Nome: ${pessoa.nome}`;
      this.cdr.markForCheck(); // essa linha é a diferença toda
    });
  }

  ngOnDestroy(): void {
    this.subscriptionBuscarPessoa?.unsubscribe();
  }
}
