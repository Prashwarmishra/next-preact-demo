import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import s from './FocusableDiv.module.scss';
import classNames from 'classnames';
import { noop } from '../../../utils';

type Props = {
  children: React.ReactNode;
  focusKey?: string;
  onEnterPressCallback?: () => void;
};

const FocusableDiv = ({
  children,
  focusKey,
  onEnterPressCallback = noop,
}: Props) => {
  const { ref, focused } = useFocusable({
    onEnterPress: onEnterPressCallback,
    focusKey,
  });

  return (
    <div ref={ref} className={classNames(s.root, { [s.focused]: focused })}>
      {children}
    </div>
  );
};

export default FocusableDiv;
