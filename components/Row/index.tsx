import {
  FocusableComponentLayout,
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import Layout from '../../types/Layout';
import ProductCard from '../../ui/molecules/ProductCard';
import s from './Row.module.scss';

type Props = {
  data: Layout;
  onFocusCallback?: (layout: FocusableComponentLayout) => void;
};

const Row = ({ data, onFocusCallback }: Props) => {
  const { ref, focusKey } = useFocusable({
    onFocus: onFocusCallback,
  });

  const handleProductCardFocus = (layout: FocusableComponentLayout) => {
    ref.current.scrollLeft = layout.x - 20;
    ref.current.style.scrollBehavior = 'smooth';
  };

  return (
    <FocusContext.Provider value={focusKey} key={data.title}>
      <>
        <h2 className={s.title}>{data.title}</h2>
        <div className={s.root} ref={ref}>
          {data.products.map((product) => (
            <ProductCard
              data={product}
              key={product.productId}
              onFocusCallback={handleProductCardFocus}
            />
          ))}
        </div>
      </>
    </FocusContext.Provider>
  );
};

export default Row;
