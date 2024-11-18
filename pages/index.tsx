import { InferGetServerSidePropsType } from 'next';
import Home from '../components/Home';
import getHomepageData from '../services/getHomepageData';

export const getServerSideProps = async () => {
  const data = await getHomepageData();

  return {
    props: { data },
  };
};

const Index = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!data) return <div>Something went wrong, please try again!</div>;
  return <Home data={data} />;
};

export default Index;
