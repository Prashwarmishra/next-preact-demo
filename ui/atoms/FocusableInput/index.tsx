import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { ChangeEvent, useState } from 'react';

import s from './FocusableInput.module.scss';
import classNames from 'classnames';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  focusKey: string;
  customStyle?: any;
};

const FocusableInput = ({
  value,
  onChange,
  placeholder,
  focusKey,
  customStyle = {},
}: Props) => {
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
    <div className={s.root}>
      <input
        ref={ref}
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNames(s.input, { [s.focused]: focused })}
        autoFocus={true}
        style={customStyle}
      />
    </div>
  );
};

export default FocusableInput;
