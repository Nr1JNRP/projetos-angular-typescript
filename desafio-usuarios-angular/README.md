# Desafio Prático — Listagem de Usuários

Reprodução do protótipo de listagem/cadastro de usuários. Angular 18, standalone components, Angular Material, Signals para o estado e RxJS para a parte assíncrona (busca com debounce, cancelamento de requisição, tratamento de erro).

## Stack

- Angular 18 (componentes standalone, sem NgModules)
- Angular Material (UI)
- Signals (estado da listagem) + RxJS (`debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`, `tap`)
- Jest (testes, com `jest-preset-angular`)
- Dados mockados em memória (array num serviço, sem back-end de verdade)

## Pré-requisitos

- Node.js 18+ e npm

## Instalação

```bash
npm install
```

## Rodando o projeto

```bash
npm start
```

Abre em `http://localhost:4200`.

## Rodando os testes

```bash
npm test
```

Roda a suíte com Jest e já gera relatório de cobertura em `coverage/` (abra `coverage/lcov-report/index.html` no navegador pra ver o detalhamento por arquivo). Cobertura atual: acima de 90% de statements/funções, bem acima do mínimo de 60% pedido.

## O que tem implementado

**Listagem**
- Cards com nome, e-mail e botão de editar
- Campo de busca por nome com debounce de 300ms (não dispara uma requisição a cada tecla)
- Estado de loading durante o carregamento
- Mensagem de erro com botão "tentar novamente" em caso de falha (o serviço mock tem um `simularErro` que pode ser ligado pra forçar esse cenário — é usado nos testes automatizados)

**Criar / editar usuário (modal)**
- Formulário reativo: e-mail, nome, CPF, telefone e tipo de telefone (celular/fixo), todos obrigatórios
- Validação de e-mail (formato), CPF (dígito verificador real, não só tamanho) e telefone (quantidade de dígitos de acordo com o tipo escolhido)
- Botão salvar desabilitado enquanto o formulário estiver inválido, com mensagem de erro por campo
- No modo edição, o formulário já vem preenchido com os dados do usuário

## Decisões técnicas

- **Signals em vez de NgRx**: o estado da listagem (`UsersStore`, em `src/app/core/state`) usa `signal`/`computed` como fonte da verdade, e RxJS só na pipeline de busca (que é onde os operadores assíncronos realmente ganham alguma coisa). Pra um caso de uso desse tamanho, NgRx seria bastante boilerplate sem trazer benefício real.
- **`recarregar()` separado do fluxo de busca**: depois de criar/editar um usuário, a lista precisa ser atualizada mesmo que o termo de busca não tenha mudado. Como a pipeline de busca usa `distinctUntilChanged()` (pra não repetir a mesma busca à toa), um refetch com o mesmo termo seria filtrado por engano — por isso existe um caminho separado (`recarregar()`) que dispara a busca direto, sem passar pelo debounce/distinctUntilChanged.
- **Dados mockados em memória**: o `UsersService` guarda os usuários num array em memória com `delay()` simulando latência de rede. Isso significa que os dados resetam a cada reload da página — é intencional pra manter o desafio simples, sem precisar subir um back-end (json-server, MSW, etc) à parte.

## Estrutura

```
src/app/
  core/
    models/       # interface Usuario
    services/      # UsersService (mock)
    validators/    # cpfValidator, telefoneValidator
    state/         # UsersStore (Signals + RxJS)
  features/
    user-list/         # tela de listagem (toolbar, busca, loading/erro, FAB)
    user-card/          # card individual da lista
    user-form-dialog/   # modal de criar/editar
```
