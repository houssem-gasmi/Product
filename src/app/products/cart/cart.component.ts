import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  constructor(public cart: CartService) {}

  confirm() {
    if (this.cart.getItems().length === 0) {
      alert('Cart is empty');
      return;
    }
    // For now, just confirm and clear cart
    if (confirm('Confirm order for ' + this.cart.total() + ' DT ?')) {
      this.cart.clear();
      alert('Order confirmed.');
    }
  }
}
