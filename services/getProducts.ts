import { BASE_URL } from '../constants';
import Product from '../types/Product';

export const serializeProduct = (data: any[]) => {
  const out: Product[] = data.map((item) => ({
    productId: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    discount: item.discountPercentage,
    rating: item.rating,
  }));

  return out;
};

export const getProducts = async () => {
  const url = `${BASE_URL}/products`;

  const res = await fetch(url);
  const data = await res.json();

  return serializeProduct(data?.products);
};
