import {
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { ProductDescription as ProductDescriptionType } from '../../types/Product';
import s from './ProductDescription.module.scss';
import useNavigation from '../../hooks/useNavigation';

type Props = {
  data: ProductDescriptionType;
};

const ProductDescription = ({ data }: Props) => {
  const { ref, focusKey } = useFocusable();
  useNavigation();

  console.log('data recieved', data);
  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.root} ref={ref}>
        Product Description
      </div>
    </FocusContext.Provider>
  );
};

export default ProductDescription;
