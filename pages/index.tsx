import { Inter } from 'next/font/google';
import { Button, Htag } from '../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Test</Htag>
      <Button appearance='primary'>Кнопка</Button>
      <Button appearance='ghost'>Кнопка</Button>
    </>
  );
}
