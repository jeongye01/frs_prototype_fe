import type { NextPage } from 'next';

import TodayTotalFRChart from 'components/ChartBoard/TodayTotalFRChart';
import HistoryDailyFRChart from 'components/ChartBoard/HistoryDailyFRChart';

const Home: NextPage = () => {
  return (
    <div className="px-32 flex items-center space-x-6 justify-between mt-12 bg-[#f5f7fc] ">
      <TodayTotalFRChart />
      <HistoryDailyFRChart />
    </div>
  );
};

export default Home;
