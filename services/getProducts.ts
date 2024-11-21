import { BASE_URL, DUMMY_IMAGES } from '../constants';
import Product from '../types/Product';

const getImage = (index: number) => {
  return DUMMY_IMAGES[index % DUMMY_IMAGES.length];
};

export const serializeProduct = (item: any, index: number) => {
  const out: Product = {
    productId: item.id,
    image: getImage(index),
    title: item.title,
    description: item.description,
    price: item.price,
    discount: item.discountPercentage,
    rating: item.rating,
  };

  return out;
};
export const serializeProducts = (data: any[]) =>
  data.map((item, index) => serializeProduct(item, index));

export const getProducts = async () => {
  const url = `${BASE_URL}/products`;

  const res = await fetch(url);
  const data = await res.json();

  return serializeProducts(data?.products);
};
