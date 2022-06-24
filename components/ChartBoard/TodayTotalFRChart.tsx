import type { NextPage } from 'next';
import { useEffect } from 'react';
import BarChart from 'components/chart/BarChart';
import PieChart from 'components/chart/PieChart';

import { AxiosError } from 'axios';
import { TodayFRType } from 'typeDefs/Chart';
import { useQuery } from 'react-query';
import { getTodayTotalFR, TodayFRResponse } from 'api/chart';
import ChartBoardLayout from './Layout';
function TodayTotalFRChart() {
  const { data, isLoading, isFetching, refetch } = useQuery<
    TodayFRResponse,
    AxiosError,
    TodayFRType
  >(['chart', 'todayTotalFR'], getTodayTotalFR, {
    select: data => data.data,

    // refetchInterval: 30000, //30초 마다 데이터 refetch
  });

  return (
    <>
      <ChartBoardLayout
        title="일별 얼굴인증현황"
        onRefreshClick={() => {
          refetch();
        }}
      >
        {!isFetching && (
          <div className="flex w-full h-full px-5">
            <div className="flex w-2/5 h-full items-center ">
              <PieChart
                data={[50, 50]}
                colors={['#2e368f', '#5c7fd6']}
                labels={['인증 성공률', '인증 실패률']}
              />
            </div>
            <div className="flex w-3/5 h-full items-center">
              <BarChart
                data={[66, 33, 33]}
                categories={['인증 요청', '인증 성공', '인증 실패']}
                colors={['#662e8f', '#2e368f', '#5c7fd6']}
              />
            </div>
          </div>
        )}
      </ChartBoardLayout>
    </>
  );
}

export default TodayTotalFRChart;
