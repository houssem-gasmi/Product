import { Product } from './product';
import { Category } from './category';

export const PRODUCTS: Product[] = [
  { reference: 'CH001', name: 'Dining Chair', stockQte: 12, unitPrice: 75, category: 'Chairs', image: 'blueChair.png', comments: [] } as Product,
  { reference: 'CH002', name: 'Office Chair', stockQte: 8, unitPrice: 150, category: 'Chairs', image: 'pinkChair.png', comments: [] } as Product,
  { reference: 'TB001', name: 'Coffee Table', stockQte: 5, unitPrice: 200, category: 'Tables', image: 'coffeTable1.png', comments: [] } as Product,
  { reference: 'SF001', name: '3-Seater Sofa', stockQte: 2, unitPrice: 1200, category: 'Sofa', image: 'sofaCategory.jpg', comments: [] } as Product
];

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Chairs',
    image: 'chairsCategory.jpg'
  },
  {
    id: 2,
    name: 'Tables',
    image: 'tableCategory.jpg'
  },
  {
    id: 3,
    name: 'Sofa',
    image: 'sofaCategory.jpg'
  }
];
