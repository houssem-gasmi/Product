import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent]
})
export class CategoryComponent implements OnInit, OnChanges {
  // Category name used to filter products
  @Input() name!: string;
  // Search term forwarded from parent to filter within this category
  @Input() searchTerm: string = '';

  // All products belonging to this category (from store)
  allProducts: Product[] = [];
  // Filtered list displayed in template
  products: Product[] = [];

  constructor(private store: ProductStoreService) {}

  ngOnInit(): void {
    // Load products from persistent store and filter by category
    this.allProducts = this.store.getAll().filter((p: Product) => p.category === this.name);
    this.filterProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filterProducts();
    }
  }

  // Apply text filtering on the product list (case-insensitive)
  filterProducts() {
    if (!this.allProducts) return;

    if (!this.searchTerm) {
      this.products = [...this.allProducts];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.products = this.allProducts.filter(p => 
        p.name.toLowerCase().includes(term)
      );
    }
  }

}
