import { ProductDescription } from './Product';

type Cart = {
  products: ProductDescription[];
  totalPrice: number;
  totalItems: number;
};

export default Cart;
