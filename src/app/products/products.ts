import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CATEGORIES } from '../shared/products';
import { CategoryComponent } from './category/category.component';
import { Category } from '../shared/category';
import { CartComponent } from './cart/cart.component';

import { Search } from '../search/search';
@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  standalone: true,
  imports: [NgFor, NgIf, CategoryComponent, CartComponent, Search]
})
export class ProductsComponent implements OnInit {
  categories!: Category[];
  showCart = false;
  currentSearchTerm: string = '';

  ngOnInit(): void {
    this.categories = CATEGORIES;
  }

  onSearch(term: string) {
    this.currentSearchTerm = term;
  }
}
