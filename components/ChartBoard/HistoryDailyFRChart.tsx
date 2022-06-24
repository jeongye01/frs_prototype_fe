import type { NextPage } from 'next';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { AxiosError } from 'axios';
import { HistoryDailyFRType } from 'typeDefs/Chart';
import { useQuery } from 'react-query';
import { getHistoryDailyFR, HistoryDailyFRResponse } from 'api/chart';
import ChartBoardLayout from './Layout';

const tempData: HistoryDailyFRType[] = [
  {
    statDe: '2022-06-01',
    reqeustCnt: 3,
    succesCnt: 1,
    failrCnt: 2,
    crttCls: null,
  },
  {
    statDe: '2022-06-02',
    reqeustCnt: 3,
    succesCnt: 1,
    failrCnt: 2,
    crttCls: null,
  },
  {
    statDe: '2022-06-03',
    reqeustCnt: 3,
    succesCnt: 1,
    failrCnt: 2,
    crttCls: null,
  },
  {
    statDe: '2022-06-04',
    reqeustCnt: 3,
    succesCnt: 1,
    failrCnt: 2,
    crttCls: null,
  },
  {
    statDe: '2022-06-05',
    reqeustCnt: 3,
    succesCnt: 1,
    failrCnt: 2,
    crttCls: null,
  },
];

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

function HistoryDailyFRChart() {
  const { data, isLoading, isFetching, refetch } = useQuery<
    HistoryDailyFRResponse,
    AxiosError,
    HistoryDailyFRType[]
  >(['chart', 'historyDailyFR'], getHistoryDailyFR, {
    select: data => data.data,

    refetchInterval: 30000, //30초 마다 데이터 refetch
  });

  return (
    <>
      {data && (
        <ChartBoardLayout title="일별 얼굴인증현황" onRefreshClick={refetch}>
          {!isFetching && (
            <TempChart
              lineName="인증이력"
              lineData={data.map(history => history.reqeustCnt)}
              bar1Name="인증성공"
              bar1Data={data.map(history => history.succesCnt)}
              bar2Name="인증실패"
              bar2Data={data.map(history => history.failrCnt)}
              categories={data.map(history => history.statDe) || 0}
            />
          )}
        </ChartBoardLayout>
      )}
    </>
  );
}

export default HistoryDailyFRChart;

interface Props {
  lineName: string;
  lineData: number[];
  bar1Name: string;
  bar1Data: number[];
  bar2Name: string;
  bar2Data: number[];
  categories: string[];
}

function TempChart({
  lineName,
  lineData,
  bar1Name,
  bar1Data,
  bar2Name,
  bar2Data,
  categories,
}: Props) {
  const state = {
    series: [
      {
        name: bar1Name,
        type: 'column',
        data: bar1Data,
      },
      {
        name: bar2Name,
        type: 'column',
        data: bar2Data,
      },
      {
        name: lineName,
        type: 'line',
        data: lineData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 2],
      },

      xaxis: {
        categories,
      },
      yaxis: {
        labels: {
          show: true,

          formatter: (value: any, index: number) => {
            return value;
          },
        },
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: 'center',
      },
    },
  };

  return (
    <div className="w-full h-full px-10">
      {lineData?.length === bar1Data?.length &&
        bar1Data?.length === bar2Data?.length &&
        bar2Data?.length === categories?.length && (
          <ReactApexChart
            type="line"
            series={state.series}
            options={state.options}
            width="100%"
            height="100%"
          />
        )}
    </div>
  );
}
