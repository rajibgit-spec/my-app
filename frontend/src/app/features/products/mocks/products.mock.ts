import { Product } from '../product.model';

// TODO: remove when backend ready
export const productsMock: Product[] = [
  {
    id: 1,
    name: 'Aurora Headset',
    sku: 'AUR-100',
    category: 'Audio',
    price: 249,
    stock: 42,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    status: 'In stock',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Nova Smartwatch',
    sku: 'NOVA-200',
    category: 'Wearables',
    price: 329,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    status: 'Low stock',
    rating: 4.6
  },
  {
    id: 3,
    name: 'Lumen Monitor',
    sku: 'LUM-300',
    category: 'Displays',
    price: 599,
    stock: 0,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    status: 'Out of stock',
    rating: 4.3
  }
];
