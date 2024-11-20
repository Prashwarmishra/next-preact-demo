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
import { useEffect } from 'react';
import { formatCurrency } from '../../utils';

const username = getUsername();

const Cart = () => {
  const { ref, focusKey, focusSelf } = useFocusable({});
  useNavigation({});

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
            <AddressCard />
            {/* <div style={{ marginTop: 100 }}>
          {SAVED_ADDRESS.map((address) => (
            <FocusableDiv>{address.name}</FocusableDiv>
          ))}
        </div> */}
          </div>

          <div className={s.right}>
            <Card>
              <div className={s.table}>
                <div className={s.desc}>Price (1 item)</div>
                <div className={s.value}>{formatCurrency(100)}</div>
              </div>
            </Card>

            <Card>
              <div className={s.table}>
                <div className={s.desc}>Delivery fee</div>
                <div className={s.value}>FREE</div>
              </div>
            </Card>

            <Card>
              <div className={s.table}>
                <div className={s.desc}>Total</div>
                <div className={s.value}>{formatCurrency(100)}</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default Cart;
