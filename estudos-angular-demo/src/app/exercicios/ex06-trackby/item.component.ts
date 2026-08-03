import { Component, Input, OnDestroy, OnInit } from '@angular/core';

export interface Item {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-ex06-item',
  standalone: true,
  template: `<li>{{ item.nome }}</li>`,
})
export class ItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) item!: Item;
  @Input({ required: true }) log!: (msg: string) => void;

  ngOnInit(): void {
    this.log(`criado: ${this.item.nome}`);
  }

  ngOnDestroy(): void {
    this.log(`destruído: ${this.item.nome}`);
  }
}
