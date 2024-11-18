import { BASE_URL } from '../constants';
import { ProductDescription } from '../types/Product';
import { serializeProduct } from './getProducts';

const serializeProductDescription = (data: any) => {
  const productDetails = serializeProduct(data);

  const out: ProductDescription = {
    ...productDetails,
    category: data.category,
    brand: data.brand,
    stock: data.stock,
    shippingInformation: data.shippingInformation,
    sku: data.sku,
  };
  return out;
};

const getProductDescription = async (productId: number) => {
  const url = `${BASE_URL}/products/${productId}`;

  const res = await fetch(url);
  const data = await res.json();

  return serializeProductDescription(data);
};

export default getProductDescription;
