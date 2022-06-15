import type { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import BarChart from 'components/chart/BarChart';
import PieChart from 'components/chart/PieChart';
import Table, { BaseTbodyRowStyle } from 'components/Table';
import dynamic from 'next/dynamic';
import User from 'components/User';
import Modal from 'components/Modal';
import useGetActionState from 'hooks/useGetActionState';
import todayTotalFRCSlice from 'store/slices/chart/todayTotalFRSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux';

import TodayTotalFRChart from 'components/ChartBoard/todayTotalFRChart';
import HistoryDailyFRChart from 'components/ChartBoard/HistoryDailyFRChart';

const fields = [
  '순번',
  '인증요청일시',
  '고객번호',
  'UUID',
  '인증결과',
  '매칭점수',
  '기준점수',
  '(a)특징점추출시간(ms)',
  '(a+α)전체처리시간(ms)',
];
const values = [
  {
    order: '1',
    date: '2022-06-02 17:44:32',
    customNum: 'SYSTEM',
    uuid: '77BA0C26-5867-440E-95AE-44FBFBF4B38A',
    result: '성공',
    matchingScore: '0.970',
    baseScore: '0.650',
    aTime: '118.5494',
    alphaTime: '127.5057',
  },
];
const Home: NextPage = () => {
  return (
    <div className="px-32 flex items-center space-x-6 justify-between mt-12 bg-[#f5f7fc] ">
      <TodayTotalFRChart />
      <HistoryDailyFRChart />
    </div>
  );
};

export default Home;
