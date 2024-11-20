import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import s from './FocusableButton.module.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: () => void;
  label: string;
  focusKey: string;
}

const FocusableButton = ({ onClick, label, focusKey, disabled }: Props) => {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onClick,
  });

  return (
    <button
      ref={ref}
      onClick={onClick}
      style={{
        backgroundColor: focused ? 'cyan' : '#61dafb',
      }}
      className={s.root}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default FocusableButton;
