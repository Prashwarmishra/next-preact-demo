import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { ChangeEvent, useState } from 'react';

import s from './FocusableInput.module.scss';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  focusKey: string;
};

const FocusableInput = ({ value, onChange, placeholder, focusKey }: Props) => {
  const [isInputFocussed, setInputFocussed] = useState(false);

  const handleEnterClick = () => {
    if (ref.current) {
      if (focused && !isInputFocussed) {
        setInputFocussed(true);
        ref.current.focus();
      } else {
        setInputFocussed(false);
        ref.current.blur();
      }
    }
  };

  const handleArrowPress = () => {
    if (ref.current) {
      setInputFocussed(false);
      ref.current.blur();
    }
    return true;
  };

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: handleEnterClick,
    onArrowPress: handleArrowPress,
  });

  return (
    <input
      ref={ref}
      type='text'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={s.root}
      style={{
        border: focused ? '2px solid cyan' : '1px solid #fff',
      }}
      autoFocus={true}
    />
  );
};

export default FocusableInput;
