import {
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import Popup from '../../ui/molecules/Popup';
import { useEffect } from 'react';

import s from './LoginNudge.module.scss';
import { useRouter } from 'next/router';
import FocusableButton from '../../ui/atoms/FocusableButton';

type Props = {
  onClose: () => void;
};

const LOGIN_REDIRECTION_FOCUS_KEY = 'loginRedirectionFocusKey';

const LoginNudge = ({ onClose }: Props) => {
  const router = useRouter();

  const { ref, focusKey } = useFocusable();

  const handleLoginRedirection = () => router.push('/login');

  useEffect(() => {
    setFocus(LOGIN_REDIRECTION_FOCUS_KEY);
  }, []);

  return (
    <div ref={ref}>
      <Popup onClose={onClose} focusKey={focusKey}>
        <div className={s.root}>
          <h2 className={s.title}>Login to view your cart</h2>

          <p className={s.description}>
            Login to view your cart, order history and more details
          </p>

          <FocusableButton
            label='Login'
            onClick={handleLoginRedirection}
            focusKey={LOGIN_REDIRECTION_FOCUS_KEY}
          />
        </div>
      </Popup>
    </div>
  );
};

export default LoginNudge;
