import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import BarChart from 'components/chart/BarChart';
import PieChart from 'components/chart/PieChart';
const Home: NextPage = () => {
  return (
    <div>
      <BarChart />
      <PieChart />
    </div>
  );
};

export default Home;
