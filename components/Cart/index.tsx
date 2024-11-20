import {
  FocusContext,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import useNavigation from '../../hooks/useNavigation';
import Card from '../../ui/atoms/Card';
import { getUsername } from '../../utils/login';
import AddressCard from '../AddressCard';
import s from './Cart.module.scss';
import { useEffect, useState } from 'react';
import { formatCurrency, noop } from '../../utils';
import CartCard from '../CartCard';
import FocusableButton from '../../ui/atoms/FocusableButton';
import { getCart, removeItemFromCart } from '../../utils/ cart';
import { ProductDescription } from '../../types/Product';
import Address from '../../types/Address';
import CartType from '../../types/Cart';
import toast, { Toaster } from 'react-hot-toast';

const username = getUsername();

const Cart = () => {
  const [data, setData] = useState<CartType>();
  const [deliveryAddress, setDeliveryAddress] = useState<Address>();

  const { ref, focusKey, focusSelf } = useFocusable({});
  useNavigation({});

  const handleSelectedAddress = (selectedAddress: Address) => {
    setDeliveryAddress(selectedAddress);
  };

  const renderPriceCard = () => {
    if (data) {
      return (
        <Card>
          <div className={s.priceCard}>
            <div className={s.table}>
              <div className={s.desc}>Price ({data.totalItems} items)</div>
              <div className={s.value}>{formatCurrency(data.totalPrice)}</div>
            </div>
            <div className={s.table}>
              <div className={s.desc}>Total</div>
              <div className={s.value}>{formatCurrency(data.totalPrice)}</div>
            </div>
            <div className={s.table}>
              <div className={s.desc}>Delivery fee</div>
              <div className={s.value}>FREE</div>
            </div>
          </div>
        </Card>
      );
    }
  };

  const handleRemoveCartItem = (product: ProductDescription) => {
    const newCartData = removeItemFromCart(product);
    setData(newCartData);
    toast.success('Item removed');
  };

  useEffect(() => {
    const cartData = getCart();
    setData(cartData);
  }, []);

  useEffect(() => {
    focusSelf();
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.root} ref={ref}>
        <Card>
          <div className={s.username}>{username}'s Cart</div>
        </Card>
        <div className={s.container}>
          <div className={s.left}>
            <AddressCard onAddressSelect={handleSelectedAddress} />

            {data && (
              <CartCard data={data} onRemoveItem={handleRemoveCartItem} />
            )}
          </div>

          <div className={s.right}>
            {renderPriceCard()}
            <FocusableButton
              focusKey=''
              label='Checkout'
              onClick={noop}
              disabled={!deliveryAddress}
            />
          </div>
        </div>
        <Toaster />
      </div>
    </FocusContext.Provider>
  );
};

export default Cart;
