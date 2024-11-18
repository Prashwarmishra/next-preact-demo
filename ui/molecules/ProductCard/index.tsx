import {
  FocusableComponentLayout,
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import s from './ProductCard.module.scss';
import classNames from 'classnames';
import Product from '../../../types/Product';
import { useRouter } from 'next/router';

type Props = {
  data: Product;
  onFocusCallback?: (layout: FocusableComponentLayout) => void;
};

const ProductCard = ({ data, onFocusCallback }: Props) => {
  const handleProductCardClick = () => {
    console.log('productCardClick');
    router.push(`/product/${data.productId}`);
  };

  const { focused, focusKey, ref } = useFocusable({
    onFocus: onFocusCallback,
    onEnterPress: handleProductCardClick,
  });

  const router = useRouter();

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        className={classNames(s.root, { [s.focused]: focused })}
        ref={ref}
        onClick={handleProductCardClick}
      />
    </FocusContext.Provider>
  );
};

export default ProductCard;
