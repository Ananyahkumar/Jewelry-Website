import { products as ramiProducts } from './product';
import { product3 } from './product3';
import product4 from './product4';
import { Product } from '../types';

const mapToProduct = (item: any): Product => ({
  id: item.id,
  name: item.name || item.title || '',
  description: (Array.isArray(item.description) ? item.description.join(' ') : item.description) || '',
  price: item.price || 0,
  image: item.image || item.productImage || '',
});

const allProducts: Product[] = [
  ...ramiProducts.map(mapToProduct),
  ...product3.map(mapToProduct),
  ...product4.map(mapToProduct),
];

export default allProducts;
