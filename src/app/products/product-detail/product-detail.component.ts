import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/product';
import { Comment } from '../../shared/comment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {
  // localStorage key prefix used to persist comments per product
  private readonly commentsKeyPrefix = 'product-comments-';
  // Product to display inside the card
  @Input() product!: Product;
  // comments form model
  commentText = '';
  commentRating = 5;
  activeTab: 'details' | 'comments' = 'details';

  constructor(private cartService: CartService) {}

  // Load persisted comments (if any) for this product once component initializes
  ngOnInit(): void {
    // Guard if product not set
    try {
      if (!this.product || !this.product.reference) return;
      const raw = localStorage.getItem(this.commentsKeyPrefix + this.product.reference);
      if (raw) {
        const arr = JSON.parse(raw) as Comment[];
        this.product.comments = arr;
      }
    } catch (e) {
      // ignoreCC
    }
  }

  // Add one unit to cart; stock is decremented only on order confirmation
  addToCart() {
    if (this.product) {
      this.cartService.add(this.product, 1);
      alert(`${this.product.name} added to cart.`);
    }
  }

  // Add a user comment and persist to localStorage
  addComment() {
    const c: Comment = { comment: this.commentText, rating: this.commentRating, date: new Date().toISOString() };
    if (!this.product.comments) this.product.comments = [];
    this.product.comments.unshift(c);
    // persist
    localStorage.setItem(this.commentsKeyPrefix + this.product.reference, JSON.stringify(this.product.comments));
    this.commentText = '';
    this.commentRating = 5;
  }

  // Helpers for controlled inputs
  onRatingChange(ev: Event) {
    const v = (ev.target as HTMLSelectElement).value;
    this.commentRating = +(v || 0);
  }

  onCommentInput(ev: Event) {
    this.commentText = (ev.target as HTMLTextAreaElement).value;
  }
}
