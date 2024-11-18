import {
  FocusableComponentLayout,
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import s from './ProductCard.module.scss';
import classNames from 'classnames';
import Product from '../../../types/Product';

type Props = {
  data: Product;
  onFocusCallback?: (layout: FocusableComponentLayout) => void;
};

const ProductCard = ({ data, onFocusCallback }: Props) => {
  const { focused, focusKey, ref } = useFocusable({
    onFocus: onFocusCallback,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={classNames(s.root, { [s.focused]: focused })} ref={ref} />
    </FocusContext.Provider>
  );
};

export default ProductCard;
