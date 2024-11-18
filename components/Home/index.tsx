import {
  FocusContext,
  init,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import ProductCard from '../../ui/molecules/ProductCard';
import s from './Home.module.scss';
import { useEffect } from 'react';
import Layout from '../../types/Layout';

type Props = {
  data: Layout[];
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
        {data?.map((category) => (
          <div key={category.title} className={s.category}>
            <h2>{category.title}</h2>
            <div className={s.products}>
              {category.products.map((product) => (
                <ProductCard key={product.productId} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </FocusContext.Provider>
  );
};

export default Home;
