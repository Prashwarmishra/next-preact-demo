import {
  FocusableComponentLayout,
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import s from './ProductCard.module.scss';
import classNames from 'classnames';
import Product from '../../../types/Product';
import { useRouter } from 'next/router';
import { formatCurrency } from '../../../utils';

type Props = {
  data: Product;
  onFocusCallback?: (layout: FocusableComponentLayout) => void;
};

const ProductCard = ({ data, onFocusCallback }: Props) => {
  const handleProductCardClick = () => {
    router.push(`/product/${data.productId}`);
  };

  const { focused, focusKey, ref } = useFocusable({
    onFocus: onFocusCallback,
    onEnterPress: handleProductCardClick,
  });

  const router = useRouter();

  const { title, discount, price, rating } = data;

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        className={classNames(s.root, { [s.focused]: focused })}
        ref={ref}
        onClick={handleProductCardClick}
      >
        <div className={s.productImage} />
        <div className={s.productDetails}>
          <h2 className={s.title}>{title}</h2>
          <div className={s.priceSection}>
            <div className={s.discountedPrice}>{formatCurrency(price)}</div>
            {discount && <div className={s.originalPrice}>{discount}% off</div>}
          </div>
          <div className={s.rating}>
            Rating: ⭐ <strong>{rating}</strong>
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default ProductCard;
