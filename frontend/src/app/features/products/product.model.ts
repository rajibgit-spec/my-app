export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: 'In stock' | 'Low stock' | 'Out of stock';
  rating: number;
}

export interface ProductFilters {
  search: string;
  category: string;
  status: string;
}
