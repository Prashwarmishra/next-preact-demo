import { ProductDescription as ProductDescriptionType } from '../../types/Product';
import s from './ProductDescription.module.scss';

type Props = {
  data: ProductDescriptionType;
};

const ProductDescription = ({ data }: Props) => {
  console.log('data recieved', data);
  return <div className={s.root}>Product Description</div>;
};

export default ProductDescription;
