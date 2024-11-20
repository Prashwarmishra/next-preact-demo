import {
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import Popup from '../../ui/molecules/Popup';
import { useEffect } from 'react';

import s from './ConfirmationNudge.module.scss';
import FocusableButton from '../../ui/atoms/FocusableButton';

type Props = {
  onClose: () => void;
};

const CONFIRMATION_NUDGE_FC = 'confirmationNudgeFC';

const title = 'Thank you for your order';
const description = "You're all set! Your order will be delivered soon!";

const ConfirmationNudge = ({ onClose }: Props) => {
  const { ref, focusKey } = useFocusable();

  useEffect(() => {
    setFocus(CONFIRMATION_NUDGE_FC);
  }, []);

  return (
    <div ref={ref}>
      <Popup onClose={onClose} focusKey={focusKey}>
        <div className={s.root}>
          <img src='images/check.gif' />

          <h2 className={s.title}>{title}</h2>

          <p className={s.description}>{description}</p>

          <FocusableButton
            label='Go to Home'
            onClick={onClose}
            focusKey={CONFIRMATION_NUDGE_FC}
          />
        </div>
      </Popup>
    </div>
  );
};

export default ConfirmationNudge;
