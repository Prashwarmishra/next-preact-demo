import { CART } from '../constants/localStorage';
import Cart from '../types/Cart';
import { ProductDescription } from '../types/Product';

const setCartToLocalStorage = (cart: Cart) => {
  localStorage.setItem(CART, JSON.stringify(cart));
  return cart;
};

export const getCart: () => Cart = () => {
  const data = localStorage.getItem(CART);

  if (data) {
    return JSON.parse(data);
  }

  return setCartToLocalStorage({
    products: [],
    totalPrice: 0,
    totalItems: 0,
  });
};

export const checkIfItemInCart = (productId: number) => {
  const cart = getCart();
  return cart.products.some((product) => product.productId === productId);
};

export const addItemToCart = (item: ProductDescription) => {
  const cart = getCart();
  const updatedCart: Cart = {
    products: [...cart.products, item],
    totalPrice: cart.totalPrice + item.price,
    totalItems: cart.totalItems + 1,
  };
  return setCartToLocalStorage(updatedCart);
};

export const removeItemFromCart = (cartItem: ProductDescription) => {
  const cart = getCart();
  const updatedCart: Cart = {
    products: cart.products.filter(
      (item) => item.productId !== cartItem.productId
    ),
    totalPrice: cart.totalPrice - cartItem.price,
    totalItems: cart.totalItems - 1,
  };
  return setCartToLocalStorage(updatedCart);
};

export const deleteCart = () => {
  localStorage.removeItem(CART);
  return true;
};
