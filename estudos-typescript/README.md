# estudos-typescript

Uns exercícios que fui fazendo pra treinar TS, Angular, RxJS e NgRx.

Cada pasta dentro de `src/` é um exercício separado. Onde fazia sentido
comparar, tem um `antes`/`problema` (código original) e um
`depois`/`solucao` (versão corrigida/refatorada), com comentários
explicando o porquê de cada mudança. Nos casos que eram mais "explica o
conceito", coloquei um `explicacao.md` na pasta.

Os exercícios de Angular/RxJS/NgRx são exemplos de código pra revisão
(pensados pra dentro de um projeto Angular de verdade) — não tem um app
Angular completo rodando aqui, mas todo mundo passa no `tsc` sem erro
de tipo (rodei `npm run typecheck` pra confirmar).

## Como rodar

```bash
npm install
npm run ex01          # exercício 1, roda de verdade
npm run ex02          # exercício 1.2, roda de verdade
npm run typecheck     # confere que todo o código compila sem erro de tipo
```

## Exercícios

- `exercicio-01-refatoracao` (1.1) — classe de estoque de produtos: tipagem, DRY, tratamento de erro
- `exercicio-02-generics-paginacao` (1.2) — função genérica de filtro + paginação
- `exercicio-03-onpush-change-detection` (2.1) — bug de OnPush não atualizando a view + `markForCheck()`
- `exercicio-04-rxjs-subscriptions-aninhadas` (2.2) — subscribe aninhado → `forkJoin` + `takeUntil`
- `exercicio-05-rxjs-busca-debounce` (2.3) — busca reativa com debounce, cancelamento e loading
- `exercicio-06-trackby-onpush-perf` (2.4) — por que `trackBy` + `OnPush` importam numa lista grande
- `exercicio-07-signals-carrinho` (3.1) — carrinho de compras só com Signals (`signal`/`computed`/`effect`)
- `exercicio-08-ngrx-todo` (3.2) — feature de To-do em NgRx: actions, reducer, selectors e effect
