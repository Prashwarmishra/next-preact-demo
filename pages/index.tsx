import { InferGetServerSidePropsType } from 'next';
import Home from '../components/Home';
import { getProducts } from '../services/getProducts';

export const getServerSideProps = async () => {
  const data = await getProducts();

  return {
    props: { data },
  };
};

const Index = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Home data={data} />;
};

export default Index;
