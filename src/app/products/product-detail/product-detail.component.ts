import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../shared/product';
import { Comment } from '../../shared/comment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductDetailComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();
  // comments form model
  commentText = '';
  commentRating = 5;
  activeTab: 'details' | 'comments' = 'details';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // load persisted comments if any (guard if product not set)
    try {
      if (!this.product || !this.product.reference) return;
      const raw = localStorage.getItem('product-comments-' + this.product.reference);
      if (raw) {
        const arr = JSON.parse(raw) as Comment[];
        this.product.comments = arr;
      }
    } catch (e) {
      // ignore
    }
  }

  addToCart() {
    if (this.product) {
      this.add.emit(this.product);
      this.cartService.add(this.product, 1);
      alert(`${this.product.name} added to cart.`);
    }
  }

  addComment() {
    const c: Comment = { comment: this.commentText, rating: this.commentRating, date: new Date().toISOString() };
    if (!this.product.comments) this.product.comments = [];
    this.product.comments.unshift(c);
    // persist
    localStorage.setItem('product-comments-' + this.product.reference, JSON.stringify(this.product.comments));
    this.commentText = '';
    this.commentRating = 5;
  }

  onRatingChange(ev: Event) {
    const v = (ev.target as HTMLSelectElement).value;
    this.commentRating = +(v || 0);
  }

  onCommentInput(ev: Event) {
    this.commentText = (ev.target as HTMLTextAreaElement).value;
  }
}
