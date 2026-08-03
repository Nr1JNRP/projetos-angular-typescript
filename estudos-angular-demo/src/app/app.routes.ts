import { Routes } from '@angular/router';
import { HomeComponent } from './exercicios/home/home.component';
import { Ex01Component } from './exercicios/ex01-refatoracao/ex01.component';
import { Ex02Component } from './exercicios/ex02-generics/ex02.component';
import { Ex03Component } from './exercicios/ex03-onpush/ex03.component';
import { Ex04Component } from './exercicios/ex04-forkjoin/ex04.component';
import { Ex05Component } from './exercicios/ex05-debounce-search/ex05.component';
import { Ex06Component } from './exercicios/ex06-trackby/ex06.component';
import { Ex07Component } from './exercicios/ex07-signals-carrinho/carrinho.component';
import { Ex08Component } from './exercicios/ex08-ngrx-todo/ex08.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ex01', component: Ex01Component },
  { path: 'ex02', component: Ex02Component },
  { path: 'ex03', component: Ex03Component },
  { path: 'ex04', component: Ex04Component },
  { path: 'ex05', component: Ex05Component },
  { path: 'ex06', component: Ex06Component },
  { path: 'ex07', component: Ex07Component },
  { path: 'ex08', component: Ex08Component },
];
