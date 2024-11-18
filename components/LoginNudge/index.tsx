import {
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import Popup from '../../ui/molecules/Popup';
import { useEffect } from 'react';

import s from './LoginNudge.module.scss';
import { useRouter } from 'next/router';

type Props = {
  onClose: () => void;
};

const LoginNudge = ({ onClose }: Props) => {
  const router = useRouter();

  const { ref, focusKey, focused } = useFocusable({
    onEnterPress: () => router.push('/login'),
  });

  useEffect(() => {
    setFocus(focusKey);
  }, []);

  return (
    <div ref={ref}>
      <Popup onClose={onClose} focusKey={focusKey}>
        <div className={s.root}>
          <h3>Login to personalize content</h3>

          <button style={{ background: focused ? 'red' : 'blue' }}>
            Login
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default LoginNudge;
