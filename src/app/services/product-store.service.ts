import { Injectable } from '@angular/core';
import { Product } from '../shared/product';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../shared/products';

@Injectable({ providedIn: 'root' })
export class ProductStoreService {
  private storageKey = 'app_products';
  private products: Product[] = [];

  constructor() {
    this.load();
  }

  private load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        this.products = JSON.parse(raw) as Product[];
      } else {
        // clone default products to avoid mutating the file's exports
        this.products = DEFAULT_PRODUCTS.map(p => ({ ...p } as Product));
      }
    } catch (e) {
      this.products = DEFAULT_PRODUCTS.map(p => ({ ...p } as Product));
    }
  }

  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }

  getAll(): Product[] {
    return this.products;
  }

  find(reference: string): Product | undefined {
    return this.products.find(p => p.reference === reference);
  }

  decrement(reference: string, amount = 1): boolean {
    const p = this.find(reference);
    if (!p) return false;
    if (p.stockQte >= amount) {
      p.stockQte -= amount;
      this.persist();
      return true;
    }
    return false;
  }

  // allow other updates
  updateProduct(product: Product) {
    const idx = this.products.findIndex(p => p.reference === product.reference);
    if (idx >= 0) {
      this.products[idx] = { ...product };
    } else {
      this.products.push({ ...product });
    }
    this.persist();
  }
}
