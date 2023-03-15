import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Htag } from '../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Test</Htag>
    </>
  );
}
