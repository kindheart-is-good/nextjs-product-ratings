import { Inter } from 'next/font/google';
import { Button, Htag, P } from '../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Test</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
      <P size='s'>Мелкий</P>
      <P size='m'>Средний</P>
      <P size='l'>Большой</P>
    </>
  );
}
