import {
  FocusableComponentLayout,
  FocusContext,
  init,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import s from './Home.module.scss';
import { useEffect } from 'react';
import Layout from '../../types/Layout';
import Row from '../Row';

type Props = {
  data: Layout[];
};

const Home = ({ data }: Props) => {
  const { ref, focusKey, focusSelf } = useFocusable();

  const handleRowFocus = (layout: FocusableComponentLayout) => {
    ref.current.scrollTop = layout.y - 200;
    ref.current.style.scrollBehavior = 'smooth';
  };

  useEffect(() => {
    if (data?.length) {
      init();
      focusSelf();
    }
  }, [data]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.root} ref={ref}>
        {data?.map((rowData) => (
          <Row data={rowData} onFocusCallback={handleRowFocus} />
        ))}
      </div>
    </FocusContext.Provider>
  );
};

export default Home;
