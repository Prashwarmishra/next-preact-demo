import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import s from './FocusableDiv.module.scss';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  onEnterPressCallback?: () => void;
};

const FocusableDiv = ({ children, onEnterPressCallback }: Props) => {
  const { ref, focused } = useFocusable({
    onEnterPress: onEnterPressCallback,
  });

  return (
    <div ref={ref} className={classNames(s.root, { [s.focused]: focused })}>
      {children}
    </div>
  );
};

export default FocusableDiv;
