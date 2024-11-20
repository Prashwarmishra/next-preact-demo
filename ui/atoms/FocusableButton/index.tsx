import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import s from './FocusableButton.module.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';

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
  const handleEnterPress = () => {
    if (!disabled) {
      onClick();
    }
  };

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: handleEnterPress,
  });

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={classNames(s.root, {
        [s.focused]: focused,
        [s.disabled]: disabled,
      })}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default FocusableButton;
