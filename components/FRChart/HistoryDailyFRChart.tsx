import { AxiosError } from 'axios';
import { HistoryDailyFRType } from 'typeDefs/Chart';
import { useQuery } from 'react-query';
import { getHistoryDailyFR, GetHistoryDailyFRResponse } from 'api/chart';
import ChartLayout from './Layout';
import MixChart from 'components/Chart/MixChart';

const tempData: HistoryDailyFRType[] = [
  {
    statDe: '2022-06-01',
    reqeustCnt: 2,
    succesCnt: 1,
    failrCnt: 1,
    crttCls: null,
  },
  {
    statDe: '2022-06-02',
    reqeustCnt: 8,
    succesCnt: 5,
    failrCnt: 3,
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
    reqeustCnt: 7,
    succesCnt: 4,
    failrCnt: 3,
    crttCls: null,
  },
  {
    statDe: '2022-06-05',
    reqeustCnt: 5,
    succesCnt: 3,
    failrCnt: 2,
    crttCls: null,
  },
];

function HistoryDailyFRChart() {
  const { data, isFetching, refetch } = useQuery<
    GetHistoryDailyFRResponse,
    AxiosError,
    HistoryDailyFRType[]
  >(['chart', 'historyDailyFR'], getHistoryDailyFR, {
    select: data => data.data,

    refetchInterval: 30000, //30초 마다 데이터 refetch
  });

  return (
    <ChartLayout
      headerColor="orange"
      onRefreshClick={refetch}
      title="일별 얼굴인증"
    >
      {data && (
        <>
          {!isFetching && (
            <MixChart
              lineName="인증이력"
              lineData={tempData.map(history => history.reqeustCnt)}
              bar1Name="인증성공"
              bar1Data={tempData.map(history => history.succesCnt)}
              bar2Name="인증실패"
              bar2Data={tempData.map(history => history.failrCnt)}
              categories={tempData.map(history => history.statDe)}
            />
          )}
        </>
      )}
    </ChartLayout>
  );
}

export default HistoryDailyFRChart;
