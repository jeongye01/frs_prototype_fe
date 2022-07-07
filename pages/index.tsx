import type { NextPage } from 'next';
import TodayTotalFRChart from 'components/FRChart/TodayTotalFRChart';
import HistoryDailyFRChart from 'components/FRChart/HistoryDailyFRChart';
import React from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getHistoryFR, GetHistoryFRResponse } from 'api/history';
import { getDefaultDateFrom, getDefaultDateTo } from 'utils/dateFormat';
import FRSHistoryTable from 'components/Table/FRSHistory';
import historyFRSlice from 'store/slices/historyFRSlice';
import { useAppDispatch } from 'hooks/redux';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  useQuery<GetHistoryFRResponse, AxiosError>(
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
      onSuccess: res =>
        dispatch(historyFRSlice.actions.updateHistoryFRState(res)),
    },
  );

  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-80" />
      <div className="px-3 md:px-8 -mt-72 mb-12">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 h-full">
              <HistoryDailyFRChart />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <TodayTotalFRChart />
            </div>
          </div>
        </div>
        <FRSHistoryTable />
      </div>
    </>
  );
};

export default Home;
