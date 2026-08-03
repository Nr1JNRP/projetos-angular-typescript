import { Component, signal } from '@angular/core';
import { Item, ItemComponent } from './item.component';

function gerarItens(): Item[] {
  // gera objetos NOVOS (referências diferentes) mas com os mesmos ids
  // - é exatamente o cenário de "veio uma resposta nova da API com os
  // mesmos dados só que em objetos novos"
  return [
    { id: 1, nome: 'Maçã' },
    { id: 2, nome: 'Banana' },
    { id: 3, nome: 'Laranja' },
    { id: 4, nome: 'Uva' },
    { id: 5, nome: 'Manga' },
  ];
}

@Component({
  selector: 'app-ex06',
  standalone: true,
  imports: [ItemComponent],
  template: `
    <h2>2.4 - trackBy + OnPush</h2>
    <p>
      clica em "regenerar lista" e olha o console: a lista SEM trackBy destrói e recria todo
      mundo, a lista COM trackBy reaproveita os itens que não mudaram (mesmo id).
    </p>
    <button (click)="regenerar()">regenerar lista (mesmos ids, objetos novos)</button>
    <p><i>abra o console do navegador (F12) pra ver os logs de criado/destruído</i></p>

    <div class="lado-a-lado">
      <section>
        <h3>❌ sem trackBy (rastreando pela referência do objeto)</h3>
        <ul>
          @for (item of semTrackBy(); track item) {
            <app-ex06-item [item]="item" [log]="logSemTrackBy" />
          }
        </ul>
      </section>

      <section>
        <h3>✅ com trackBy (track item.id)</h3>
        <ul>
          @for (item of comTrackBy(); track item.id) {
            <app-ex06-item [item]="item" [log]="logComTrackBy" />
          }
        </ul>
      </section>
    </div>
  `,
})
export class Ex06Component {
  semTrackBy = signal<Item[]>(gerarItens());
  comTrackBy = signal<Item[]>(gerarItens());

  logSemTrackBy = (msg: string) => console.log('[sem trackBy]', msg);
  logComTrackBy = (msg: string) => console.log('[com trackBy]', msg);

  regenerar(): void {
    console.log('--- regenerando lista (mesmos ids, objetos novos) ---');
    this.semTrackBy.set(gerarItens());
    this.comTrackBy.set(gerarItens());
  }
}
