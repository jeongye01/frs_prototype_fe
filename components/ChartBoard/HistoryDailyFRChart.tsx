import type { NextPage } from 'next';
import { useEffect } from 'react';
import BarChart from 'components/chart/BarChart';
import PieChart from 'components/chart/PieChart';
import useGetActionState from 'hooks/useGetActionState';
import historyDailyFRSlice from 'store/slices/chart/historyDailyFRSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import dynamic from 'next/dynamic';
import { getEnabledCategories } from 'trace_events';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

function HistoryDailyFRChart() {
  const dispatch = useAppDispatch();
  const { statDes, reqeustCnts, succesCnts, failrCnts } = useAppSelector(
    state => state.historyDailyFR,
  );
  const [loading, result] = useGetActionState(
    historyDailyFRSlice.actions.loadHistoryDailyFRData.type,
  );

  useEffect(() => {
    if (loading) return;
    // 임의로 5로 지정
    dispatch(historyDailyFRSlice.actions.loadHistoryDailyFRData(5));
  }, [dispatch]);
  useEffect(() => {
    console.log(result?.isSuccess);
  }, [result]);
  return (
    <>
      {result?.isSuccess ? (
        <div className="flex flex-col items-center shadow-md min-w-[250px] h-full  w-full rounded-lg bg-white">
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
            <h2 className="text-white">일별 얼굴인증현황</h2>
          </div>
          <TempChart
            lineName="인증이력"
            lineData={reqeustCnts}
            bar1Name="인증성공"
            bar1Data={succesCnts}
            bar2Name="인증실패"
            bar2Data={failrCnts}
            categories={statDes}
          />
        </div>
      ) : (
        <>Loading...</>
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
