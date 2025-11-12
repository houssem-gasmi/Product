import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  standalone: true,
  template: `
    <div class="d-flex flex-column min-vh-100">
      <app-header />
      <main class="flex-grow-1">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }
  `
})
export class App { }
