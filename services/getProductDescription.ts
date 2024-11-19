import { BASE_URL } from '../constants';
import { ProductDescription } from '../types/Product';
import { serializeProduct } from './getProducts';

const serializeProductDescription = (data: any) => {
  const productDetails = serializeProduct(data);

  const out: ProductDescription = {
    ...productDetails,
    category: data.category,
    brand: data.brand ?? '',
    stock: data.stock,
    shippingInformation: data.shippingInformation,
    sku: data.sku,
    productImages: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/television/b/g/n/-original-imagtwterapbxxdj.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/television/h/8/6/-original-imagtjhhmrjb6d4m.jpeg?q=70&crop=false',
    ],
    reviews: data.reviews,
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
