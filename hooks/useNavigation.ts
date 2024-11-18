import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { noop } from '../utils';

const useNavigation = (isPopup = false, onBackPress = noop) => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const navigateBack = () => {
    router.back();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onBackPress();
      if (!isPopup) navigateBack();
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    navigateTo,
  };
};

export default useNavigation;
