import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  standalone: true,
  imports: [FormsModule, NgFor]
})
export class ProductsComponent {
  products = [
    { reference: 'P001', name: 'Laptop', stockQte:  0, unitPrice: 1200 },
    { reference: 'P002', name: 'Mouse', stockQte: 50, unitPrice: 25 },
    { reference: 'P003', name: 'Keyboard', stockQte: 30, unitPrice: 45 },
    { reference: 'P004', name: 'Headset', stockQte: 20, unitPrice: 80 }
  ];

  qte = [0, 0, 0, 0];
  total = [0, 0, 0, 0];
  finalTotal = 0;

  addCommand(index: number) {
    const ordered = this.qte[index];
    if (ordered <= this.products[index].stockQte && ordered > 0) {
      this.total[index] = ordered * this.products[index].unitPrice;
    }
  }

  changeQte(index: number, qte: number) {
    this.products[index].stockQte -= qte;
  }

  order() {
    this.finalTotal = this.total.reduce((a, b) => a + b, 0);
    alert('Total order amount: ' + this.finalTotal + ' DT');
    this.qte = [0, 0, 0, 0];
    this.total = [0, 0, 0, 0];
  }
}
