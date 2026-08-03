# 2.1 - por que o nome não aparece

O `OnPush` faz o Angular parar de checar o componente em todo ciclo de
change detection. Ele só volta a checar quando rola uma dessas coisas:

- um `@Input` recebe uma referência nova
- dispara um evento de dentro do próprio componente (click, etc)
- um `async pipe` emite valor novo
- alguém chama `markForCheck()` (ou `detectChanges()`) manualmente

No código original, o `this.texto = ...` é feito dentro do `subscribe`.
Isso roda dentro da zone do Angular (o zone.js intercepta o `setTimeout`
que o `delay()` usa por baixo dos panos), então o Angular *sabe* que
alguma coisa assíncrona terminou e dispara um ciclo de detecção geral.

O problema é que, mesmo com esse ciclo geral rodando, o componente em
si continua marcado como "não sujo" (`OnPush` só olha pra ele se
alguma das condições acima acontecer). Só atribuir a propriedade
`this.texto` não conta como motivo pra Angular re-renderizar. Resultado:
o valor muda na instância da classe, mas a view nunca é atualizada.

## a correção

Injeta o `ChangeDetectorRef` e chama `this.cdr.markForCheck()` logo
depois de atualizar o `texto`. Isso avisa o Angular "ei, esse componente
mudou, inclui ele no próximo ciclo de verificação". Simples assim,
sem precisar trocar a estratégia pra `Default` nem mexer em mais nada.

(repara que o `contador` do `setInterval` nem aparece no template, então
ele não é o problema — é só um distrator do enunciado)
