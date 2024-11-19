import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isClient, noop } from '../utils';
import { BACK_PRESS_DISABLED } from '../constants/sessionStorage';

const useNavigation = ({ isPopup = false, onBackPress = noop }) => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const navigateBack = () => {
    router.back();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const backPressDisabledString = sessionStorage.getItem(BACK_PRESS_DISABLED);
    const backPressDisabled = backPressDisabledString === 'true';

    if (e.key === 'Escape') {
      if (isPopup) {
        onBackPress();
      } else if (!backPressDisabled) {
        navigateBack();
      }
    }
  };

  useEffect(() => {
    return () => {
      const backPressDisabledString =
        sessionStorage.getItem(BACK_PRESS_DISABLED);
      const backPressDisabled = backPressDisabledString === 'true';
      if (backPressDisabled) {
        sessionStorage.setItem(BACK_PRESS_DISABLED, 'false');
      }
    };
  }, []);

  useEffect(() => {
    if (isClient) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    navigateTo,
  };
};

export default useNavigation;
