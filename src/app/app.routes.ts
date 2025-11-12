import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductsComponent } from './products/products';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductsComponent }
];
