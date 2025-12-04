import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }
  `
})
export class App { }
