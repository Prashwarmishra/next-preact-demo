import { InferGetServerSidePropsType } from 'next';
import ProductDescriptionComponent from '../../components/ProductDescription';
import getProductDescription from '../../services/getProductDescription';

export const getServerSideProps = async (context: any) => {
  const { productId } = context.params;

  const data = await getProductDescription(productId);

  return {
    props: { data },
  };
};

const ProductDescription = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!data) return <div>Something went wrong, please try again!</div>;
  return <ProductDescriptionComponent data={data} />;
};

export default ProductDescription;
