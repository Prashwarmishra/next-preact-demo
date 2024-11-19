import {
  FocusableComponentLayout,
  FocusContext,
  init,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import s from './Home.module.scss';
import { useEffect, useState } from 'react';
import Layout from '../../types/Layout';
import Row from '../Row';
import LoginNudge from '../LoginNudge';
import { WAS_LOGIN_NUDGE_SHOWN } from '../../constants/sessionStorage';

type Props = {
  data: Layout[];
};

const Home = ({ data }: Props) => {
  const { ref, focusKey } = useFocusable();
  const [showLoginNudge, setShowLoginNudge] = useState(false);

  const handleRowFocus = (layout: FocusableComponentLayout) => {
    ref.current.scrollTop = layout.y - 200;
    ref.current.style.scrollBehavior = 'smooth';
  };

  const handleCloseLoginNudge = () => {
    setShowLoginNudge(false);
  };

  const runLoginNudgeFlow = () => {
    const wasLoginNudgeShown = sessionStorage.getItem(WAS_LOGIN_NUDGE_SHOWN);
    if (wasLoginNudgeShown !== 'true') {
      sessionStorage.setItem(WAS_LOGIN_NUDGE_SHOWN, 'true');
      setTimeout(() => setShowLoginNudge(true), 500);
    }
  };

  useEffect(() => {
    if (data?.length) {
      init();
      setFocus(focusKey);
      runLoginNudgeFlow();
    }
  }, [data]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.root} ref={ref}>
        {data?.map((rowData) => (
          <Row data={rowData} onFocusCallback={handleRowFocus} />
        ))}

        {showLoginNudge && <LoginNudge onClose={handleCloseLoginNudge} />}
      </div>
    </FocusContext.Provider>
  );
};

export default Home;
