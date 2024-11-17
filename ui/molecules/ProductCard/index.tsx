import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import s from './ProductCard.module.scss';
import classNames from 'classnames';

const ProductCard = () => {
  const { ref, focused } = useFocusable();

  return (
    <div className={classNames(s.root, { [s.focused]: focused })} ref={ref} />
  );
};

export default ProductCard;
