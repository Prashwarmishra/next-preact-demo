import Product from '../../types/Product';
import s from './Home.module.scss';

type Props = {
  data: Product[];
};

const Home = ({ data }: Props) => {
  console.log('data recieved', data);
  return <div className={s.root}>Home</div>;
};

export default Home;
