import { ReactChild } from 'react';
import s from './Card.module.scss';

type Props = {
  children: ReactChild;
};

const Card = ({ children }: Props) => {
  return <div className={s.root}>{children}</div>;
};

export default Card;
