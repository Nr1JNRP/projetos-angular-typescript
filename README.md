# projetos-angular-typescript

Três projetos de estudo/desafio em TypeScript e Angular, cada um numa pasta própria. Pré-requisito geral: **Node.js 18+** e **npm**.

```
projetos-angular-typescript/
  estudos-typescript/          # exercícios de TS puro (sem Angular rodando)
  estudos-angular-demo/        # os mesmos exercícios de Angular/RxJS/NgRx, rodando de verdade
  desafio-usuarios-angular/    # o desafio prático completo (listagem + CRUD de usuários)
```

Cada pasta é independente — tem seu próprio `package.json`, e o `node_modules` de uma **não** serve pra outra. Sempre rode `npm install` **dentro** da pasta do projeto que for usar, não na raiz.

---

## 1. `estudos-typescript`

Exercícios de refatoração/generics em TypeScript puro. Alguns rodam de verdade (via `ts-node`), os de Angular/NgRx/RxJS são só código de referência pra leitura (compilam limpo, mas não têm um app rodando — isso é o `estudos-angular-demo` abaixo).

```bash
cd estudos-typescript
npm install
npm run ex01          # roda o exercício 1.1
npm run ex02           # roda o exercício 1.2
npm run typecheck     # confere que tudo compila sem erro de tipo
```

## 2. `estudos-angular-demo`

App Angular com uma página por exercício (2.1 a 3.2), pra ver o comportamento de verdade no navegador (bug de OnPush, forkJoin, debounce, trackBy, Signals, NgRx).

```bash
cd estudos-angular-demo
npm install
npm start
```

Abre em **http://localhost:4200**. Navega pelos links do topo (`1.1`, `1.2`, `2.1`... até `3.2`) pra ver cada exercício.

## 3. `desafio-usuarios-angular`

O desafio prático: listagem de usuários com busca, loading/erro, e modal de criar/editar com formulário reativo e validação (e-mail, CPF, telefone).

```bash
cd desafio-usuarios-angular
npm install
npm start
```

Abre em **http://localhost:4200**.

Rodar os testes (Jest, cobertura acima de 90%):

```bash
npm test
```

O relatório de cobertura fica em `coverage/lcov-report/index.html` depois de rodar.

Mais detalhes técnicos (decisões de arquitetura, por que Signals em vez de NgRx, etc.) estão no `README.md` de dentro dessa pasta.

---

## Rodando mais de um ao mesmo tempo

Como `estudos-angular-demo` e `desafio-usuarios-angular` usam a mesma porta padrão (**4200**) do Angular CLI, se quiser ter os dois no ar ao mesmo tempo rode um deles numa porta diferente:

```bash
npm start -- --port 4300
```
