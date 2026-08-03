// 2.2 - tirando o subscribe aninhado
//
// repara que a segunda chamada (buscarQuantidadeFamiliares) não depende
// de nada que vem da primeira resposta - ela já usa o mesmo pessoaId
// que a gente já tem. então não faz sentido esperar uma terminar pra
// só depois disparar a outra (que era o que o subscribe aninhado fazia,
// e de quebra ainda deixava a subscription de dentro sem controle
// nenhum de cancelamento = memory leak).
//
// por isso usei forkJoin: dispara as duas ao mesmo tempo e só emite
// quando as duas já responderam. se a segunda chamada dependesse do
// resultado da primeira, aí sim eu usaria switchMap.
import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// tipando a "forma" do serviço em vez de usar any - além de mais
// seguro, é isso que faz o forkJoin conseguir inferir que "pessoa"
// e "qtd" abaixo não são unknown
interface PessoaServiceLike {
  buscarPorId(id: number): Observable<{ id: number; nome: string }>;
  buscarQuantidadeFamiliares(id: number): Observable<number>;
}

@Component({
  selector: 'app-pessoa',
  template: `<h1>{{ texto }}</h1>`,
})
export class PessoaComponent implements OnInit, OnDestroy {
  texto = '';

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly pessoaService: PessoaServiceLike) {}

  ngOnInit(): void {
    const pessoaId = 1;

    forkJoin({
      pessoa: this.pessoaService.buscarPorId(pessoaId),
      qtd: this.pessoaService.buscarQuantidadeFamiliares(pessoaId),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ pessoa, qtd }) => {
        this.texto = `Nome: ${pessoa.nome} | familiares: ${qtd}`;
      });
  }

  ngOnDestroy(): void {
    // takeUntil garante que, se o componente for destruído antes da
    // resposta chegar, a subscription morre junto - sem isso ela
    // ficaria pendurada esperando um componente que já nem existe mais
    this.destroy$.next();
    this.destroy$.complete();
  }
}
