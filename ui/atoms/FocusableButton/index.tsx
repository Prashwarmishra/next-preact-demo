import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import s from './FocusableButton.module.scss';

type Props = {
  onClick: () => void;
  label: string;
  focusKey: string;
};

const FocusableButton = ({ onClick, label, focusKey }: Props) => {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onClick,
  });

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        backgroundColor: focused ? 'cyan' : '#61dafb',
      }}
      className={s.root}
    >
      {label}
    </div>
  );
};

export default FocusableButton;
