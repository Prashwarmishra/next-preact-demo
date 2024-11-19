import {
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { useEffect } from 'react';

const MobileNumber = () => {
  const { focusKey, ref, focused, focusSelf } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, []);

  console.log('focusKey', focusKey, focused);
  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        <button>Request OTP</button>
        <input
          type='text'
          placeholder='Mobile Number'
          style={{
            border: '1px solid',
            borderColor: focused ? 'red' : 'transparent',
          }}
        />
      </div>
    </FocusContext.Provider>
  );
};

export default MobileNumber;
