import type { NextPage } from 'next';
import TodayTotalFRChart from 'components/chartBoard/TodayTotalFRChart';
import HistoryDailyFRChart from 'components/chartBoard/HistoryDailyFRChart';
import Table from 'components/Table';
import React, { useEffect } from 'react';
import { AxiosError } from 'axios';
import { HistoryFRType } from 'typeDefs/HistoryFR';
import { useQuery } from 'react-query';
import { getHistoryFR, HistoryFRResponse } from 'api/history';
import {
  leadingZeros,
  getDefaultDateFrom,
  getDefaultDateTo,
} from 'utils/dateFormat';
const fields = [
  '순번',
  '인증 요청일',
  '얼굴 ID',
  '매칭 점수',
  '기준 점수',
  '인증결과-코드',
  '단말 번호',
  '단말 이름',
  '그룹 코드',
];

const Home: NextPage = () => {
  const { data, isLoading, isFetching, refetch } = useQuery<
    HistoryFRResponse,
    AxiosError,
    HistoryFRType[]
  >(
    ['history', 'historyFR'],
    () =>
      getHistoryFR({
        pageSize: 20,
        page: 0,
        searchDateFrom: getDefaultDateFrom(),
        searchDateTo: getDefaultDateTo(),
        resultCd: null,
      }),
    {
      select: data => data.data.content,
    },
  );
  console.log(data);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-80" />
      <div className="px-3 md:px-8 -mt-72 mb-12">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <HistoryDailyFRChart />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <TodayTotalFRChart />
            </div>
          </div>
        </div>
        <Table fields={fields} tbodyRows={<HistoryRows data={data} />} />
      </div>
    </>
  );
};

export default Home;

interface Props {
  data: HistoryFRType[];
}
function HistoryRows({ data }: Props) {
  return (
    <>
      {data?.map((history, i) => (
        <tr key={history.faceId} className="">
          <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-2 text-center">
            {history.sn}
          </th>
          <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-2 text-center">
            {history.requestDt
              ?.replace('T', ' ')
              .replace(/\..*/, '')
              .slice(0, -3)}
          </th>
          {Object.values(history)
            .slice(2, -2)
            .map(value => (
              <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-2 text-center">
                {value}
              </th>
            ))}
        </tr>
      ))}
    </>
  );
}
