import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  constructor(public cart: CartService, private store: ProductStoreService) {}

  confirm() {
    if (this.cart.getItems().length === 0) {
      alert('Cart is empty');
      return;
    }
    // Check availability first
    const insufficient = this.cart.getItems().filter(it => {
      const p = this.store.find(it.productRef);
      return !p || p.stockQte < it.qty;
    });

    if (insufficient.length > 0) {
      const names = insufficient.map(i => i.name + ' (need ' + i.qty + ')').join(', ');
      alert('Not enough stock for: ' + names);
      return;
    }

    if (confirm('Confirm order for ' + this.cart.total() + ' DT ?')) {
      // Decrement stock for each item
      for (const it of this.cart.getItems()) {
        this.store.decrement(it.productRef, it.qty);
      }
      this.cart.clear();
      alert('Order confirmed.');
    }
  }
}
