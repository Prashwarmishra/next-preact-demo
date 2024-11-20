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
import { SAVED_ADDRESS } from '../../constants/addresses';
import FocusableDiv from '../../ui/atoms/FocusableDiv';

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

        <AddressCard />
        {/* <div style={{ marginTop: 100 }}>
          {SAVED_ADDRESS.map((address) => (
            <FocusableDiv>{address.name}</FocusableDiv>
          ))}
        </div> */}
      </div>
    </FocusContext.Provider>
  );
};

export default Cart;
