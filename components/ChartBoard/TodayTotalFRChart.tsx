import type { NextPage } from 'next';
import { useEffect } from 'react';
import BarChart from 'components/chart/BarChart';
import PieChart from 'components/chart/PieChart';
import useGetActionState from 'hooks/useGetActionState';
import todayTotalFRCSlice from 'store/slices/chart/todayTotalFRSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useQuery, UseQueryOptions } from 'react-query';
import { TodayFRType } from 'typeDefs/Chart';
import { useGetServerData, getTodayTotalFR, TodayFRResponse } from 'api/chart';
import { AxiosError } from 'axios';

function TodayTotalFRChart() {
  const { data, isLoading, isFetching } = useQuery<
    TodayFRResponse,
    AxiosError,
    TodayFRType
  >(['chart', 'todayTotalFR'], getTodayTotalFR, {
    select: data => data.data,
    staleTime: 1000,
  });
  useEffect(() => {
    console.log(data, isFetching);
  }, [data, isFetching]);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col items-center shadow-md min-w-[250px] h-full  w-full rounded-lg bg-white">
          <div className="flex items-center p-3 w-full text-base    border-b rounded-t-lg border-b-gray-300 bg-[#3b75e3] ">
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
          <div className="flex w-full h-full">
            <div className="flex w-3/5 h-full items-center">
              <BarChart
                data={[
                  data?.cfFailCnt || 0,
                  data?.cfFailCnt || 0,
                  data?.cfFailRate || 0,
                ]}
                categories={['인증 요청', '인증 성공', '인증 실패']}
                colors={['#662e8f', '#2e368f', '#5c7fd6']}
              />
            </div>
            <div className="flex w-2/5 h-full items-center ">
              <PieChart
                data={[33, 33]}
                colors={['#2e368f', '#5c7fd6']}
                labels={['인증 성공률', '인증 실패률']}
              />
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default TodayTotalFRChart;
/*

todayTotalFRData.cfTotCnt,
                  todayTotalFRData.cfPassCnt,
                  todayTotalFRData.cfFailCnt,

 todayTotalFRData.cfPassRate,
                  todayTotalFRData.cfFailRate,


                  */
