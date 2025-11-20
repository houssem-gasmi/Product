import { Injectable } from '@angular/core';
import { Product } from '../shared/product';

export interface CartItem {
  productRef: string;
  name: string;
  qty: number;
  unitPrice: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'app_cart';
  private items: CartItem[] = [];

  constructor() {
    this.load();
  }

  private load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) this.items = JSON.parse(raw) as CartItem[];
    } catch (e) {
      this.items = [];
    }
  }

  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  getItems(): CartItem[] {
    return this.items;
  }

  add(product: Product, qty = 1) {
    const existing = this.items.find(i => i.productRef === product.reference);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ productRef: product.reference, name: product.name, qty, unitPrice: product.unitPrice });
    }
    this.persist();
  }

  remove(productRef: string) {
    this.items = this.items.filter(i => i.productRef !== productRef);
    this.persist();
  }

  clear() {
    this.items = [];
    this.persist();
  }

  total() {
    return this.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  }
}
