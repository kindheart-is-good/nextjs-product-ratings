import { Inter } from 'next/font/google';
import { Button, Htag, P, Tag } from '../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Test</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
      <P size='s'>Мелкий</P>
      <P>Средний</P>
      <P size='l'>Большой</P>
      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>red</Tag>
      <Tag size='s' color='grey'>grey</Tag>
      <Tag size='m' color='green'>green</Tag>
      <Tag size='s' color='primary'>primary</Tag>
    </>
  );
}
