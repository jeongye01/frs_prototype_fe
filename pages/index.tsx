import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import BarChart from 'components/chart/BarChart';

import Table from 'components/Table';
import dynamic from 'next/dynamic';

const PieChart = dynamic(() => import('components/chart/PieChart'), {
  ssr: false,
});
const Home: NextPage = () => {
  return (
    <>
      <BarChart />
      <PieChart />
    </>
  );
};

export default Home;
