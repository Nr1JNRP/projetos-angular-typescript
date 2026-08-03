# 2.4 - trackBy + OnPush numa lista grande

## por que trackBy importa

Sem `trackBy`, quando o array muda (mesmo que só 1 item), o Angular por
padrão compara os itens do `@for`/`ngFor` pela **referência do objeto**.
Se o array inteiro for recriado (ex: veio uma resposta nova da API com
os "mesmos" dados, mas em objetos novos), o Angular não tem como saber
que são "os mesmos itens de antes" e acaba destruindo e recriando
**todos** os elementos DOM da lista do zero - mesmo que só um item
tenha mudado de verdade.

Com `trackBy` (ou a sintaxe nova `track` do `@for`), você dá uma "chave
estável" pro Angular (geralmente o `id`):

```ts
trackByFn(index: number, item: Item): number {
  return item.id;
}
```

```html
<li *ngFor="let item of itens; trackBy: trackByFn">{{ item.nome }}</li>
```

Com isso o Angular consegue comparar por id e só recria/atualiza o DOM
dos itens que realmente mudaram, reaproveitando o resto. Numa lista de
centenas de itens isso é a diferença entre re-renderizar 1 `<li>` ou
recriar todos os 500 na mão.

## como o OnPush ajuda nesse cenário

Se o componente pai (ou o componente que tem a lista) usa `OnPush`, o
Angular só roda change detection nele quando um `@Input` muda de
referência, um evento é disparado dentro dele, ou tem `markForCheck()`
manual. Isso evita que a lista inteira seja re-verificada toda vez que
*qualquer outra coisa* na aplicação mudar (um contador em outro
componente, por exemplo) - só entra no ciclo de verificação quando algo
realmente relevante pra ele mudou.

Combinar `OnPush` (evita checar o componente à toa) com `trackBy`
(evita recriar o DOM à toa quando o componente É checado) é o combo
certo pra lista grande.

## e se fosse Default?

Com a estratégia `Default`, o Angular verifica a lista **inteira** em
todo ciclo de change detection do app - mesmo que nada relacionado a
ela tenha mudado (um clique em qualquer lugar da tela, um timer, uma
resposta HTTP de outro componente, tudo dispara um ciclo geral). Numa
lista de centenas de itens isso vira um trabalho de comparação enorme
rodando toda hora à toa, e é um dos principais motivos de UI travando
em app Angular grande.
