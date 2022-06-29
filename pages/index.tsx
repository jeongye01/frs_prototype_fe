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
      <div className="px-32 h-full mt-20  justify-between mb-12 bg-[#f5f7fc] ">
        <div className="gap-12 h-[300px] mb-6  flex items-start">
          <div className="w-3/5 h-full ">
            <HistoryDailyFRChart />
          </div>
          <div className="w-2/5 h-full ">
            <TodayTotalFRChart />
          </div>
        </div>
        {data && (
          <Table fields={fields} tbodyRows={<HistoryRows data={data} />} />
        )}
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
      {data.map((history, i) => (
        <tr
          key={history.faceId}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          {Object.values(history)
            .slice(0, -2)
            .map(value => (
              <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
                {value}
              </td>
            ))}
        </tr>
      ))}
    </>
  );
}
