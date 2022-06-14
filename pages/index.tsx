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
  const dispatch = useAppDispatch();
  const { data: todayTotalFRData } = useAppSelector(
    state => state.todayTotalFR,
  );
  const [loading, result] = useGetActionState(
    todayTotalFRCSlice.actions.loadTodayTodalFRData.type,
  );

  useEffect(() => {
    if (loading) return;
    dispatch(todayTotalFRCSlice.actions.loadTodayTodalFRData());
  }, [dispatch]);
  useEffect(() => {
    console.log(todayTotalFRData);
  }, [todayTotalFRData]);
  return (
    <>
      {result?.isSuccess ? (
        <div className="px-32 flex items-center space-x-6 justify-between mt-12 bg-[#f5f7fc] ">
          {[1, 1, 1].map((_, idx) => (
            <div className="flex flex-col items-center shadow-md min-w-[250px]  w-full rounded-lg bg-white">
              <div className="flex items-center p-3 w-full text-base   border-b rounded-t-lg border-b-gray-300 bg-[#3b75e3] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <h2 className="text-white">금일 얼굴인증현황(1:1&1:N)</h2>
              </div>
              <BarChart
                data={[
                  todayTotalFRData.cfTotCnt,
                  todayTotalFRData.cfPassCnt,
                  todayTotalFRData.cfFailCnt,
                ]}
                categories={['인증 요청', '인증 성공', '인증 실패']}
                colors={['#662e8f', '#2e368f', '#5c7fd6']}
              />
              <div className="border-t  w-[90%] border-dashed border-t-slate-400" />
              <div className="mt-4 py-6  w-[70%] ">
                <PieChart
                  data={[
                    todayTotalFRData.cfPassRate,
                    todayTotalFRData.cfFailRate,
                  ]}
                  colors={['#2e368f', '#5c7fd6']}
                  labels={['인증 성공률', '인증 실패률']}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Home;
