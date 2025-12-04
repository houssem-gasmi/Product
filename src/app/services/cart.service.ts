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
  // LocalStorage key used to persist cart between sessions
  private storageKey = 'app_cart';
  private items: CartItem[] = [];

  constructor() {
    this.load();
  }

  // Load persisted cart items (if any)
  private load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) this.items = JSON.parse(raw) as CartItem[];
    } catch (e) {
      this.items = [];
    }
  }

  // Persist current cart state to LocalStorage
  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  // Return a snapshot of current cart items
  getItems(): CartItem[] {
    return this.items;
  }

  // Add a product to the cart (increase qty if already present)
  add(product: Product, qty = 1) {
    const existing = this.items.find(i => i.productRef === product.reference);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ productRef: product.reference, name: product.name, qty, unitPrice: product.unitPrice });
    }
    this.persist();
  }

  // Remove a single product by reference
  remove(productRef: string) {
    this.items = this.items.filter(i => i.productRef !== productRef);
    this.persist();
  }

  // Empty the cart
  clear() {
    this.items = [];
    this.persist();
  }

  // Compute total price
  total() {
    return this.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  }
}
