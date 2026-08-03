import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly links = [
    { path: '/', label: 'início' },
    { path: '/ex01', label: '1.1' },
    { path: '/ex02', label: '1.2' },
    { path: '/ex03', label: '2.1' },
    { path: '/ex04', label: '2.2' },
    { path: '/ex05', label: '2.3' },
    { path: '/ex06', label: '2.4' },
    { path: '/ex07', label: '3.1' },
    { path: '/ex08', label: '3.2' },
  ];
}
