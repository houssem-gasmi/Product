import { Component, Input, OnInit } from '@angular/core';
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
export class CategoryComponent implements OnInit {
  @Input() name!: string;

  products!: Product[];

  constructor(private store: ProductStoreService) {}

  ngOnInit(): void {
    // get products from persistent store and filter by category
    this.products = this.store.getAll().filter((p: Product) => p.category === this.name);
  }

  onAdd(product: Product) {
    const success = this.store.decrement(product.reference, 1);
    if (success) {
      alert(`${product.name} added. Remaining stock: ${product.stockQte}`);
    } else {
      alert(`${product.name} is out of stock`);
    }
  }
}
