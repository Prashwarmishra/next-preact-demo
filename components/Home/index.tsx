import {
  FocusContext,
  init,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import Product from '../../types/Product';
import ProductCard from '../../ui/molecules/ProductCard';
import s from './Home.module.scss';
import { useEffect } from 'react';

type Props = {
  data: Product[];
};

const Home = ({ data }: Props) => {
  console.log('data recieved', data);
  const { ref, focusKey, focusSelf } = useFocusable();

  useEffect(() => {
    if (data?.length) {
      init();
      focusSelf();
    }
  }, [data]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.root} ref={ref}>
        <h2>Title</h2>

        <div className={s.products}>
          {data.map((product) => (
            <ProductCard key={product.productId} />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default Home;
