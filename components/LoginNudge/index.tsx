import {
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import Popup from '../../ui/molecules/Popup';
import { useEffect } from 'react';

import s from './LoginNudge.module.scss';
import { useRouter } from 'next/router';
import FocusableButton from '../../ui/atoms/FocusableButton';
import { REDIRECTION_PATH_AFTER_LOGIN } from '../../constants/sessionStorage';

type Props = {
  onClose: () => void;
  title?: string;
  description?: string;
};

const LOGIN_REDIRECTION_FOCUS_KEY = 'loginRedirectionFocusKey';

const LoginNudge = ({
  onClose,
  title = 'Login to view your cart',
  description = 'Login to view your cart, order history and more details',
}: Props) => {
  const router = useRouter();

  const { ref, focusKey } = useFocusable();

  const handleLoginRedirection = () => {
    router.push('/login');
    sessionStorage.setItem(REDIRECTION_PATH_AFTER_LOGIN, location.pathname);
  };

  useEffect(() => {
    setFocus(LOGIN_REDIRECTION_FOCUS_KEY);
  }, []);

  return (
    <div ref={ref}>
      <Popup onClose={onClose} focusKey={focusKey}>
        <div className={s.root}>
          <h2 className={s.title}>{title}</h2>

          <p className={s.description}>{description}</p>

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
