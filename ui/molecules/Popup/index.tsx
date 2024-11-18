import {
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { createPortal } from 'react-dom';

import s from './Popup.module.scss';
import { isClient } from '../../../utils';
import useNavigation from '../../../hooks/useNavigation';

type Props = {
  children: React.ReactNode;
  focusKey: string;
  onClose: () => void;
};

const Popup = ({ children, focusKey, onClose }: Props) => {
  useNavigation(true, onClose);

  const { ref } = useFocusable({ focusKey });

  if (!isClient) return null;

  return (
    <FocusContext.Provider value={focusKey}>
      {createPortal(
        <div ref={ref} className={s.root}>
          <div className={s.content}>{children}</div>
        </div>,
        document.body
      )}
    </FocusContext.Provider>
  );
};

export default Popup;
