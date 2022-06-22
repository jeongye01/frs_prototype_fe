import { useQuery } from 'react-query';
import { TodayFRType } from 'typeDefs/Chart';
import client from './client';

export interface TodayFRResponse {
  data: {
    cfTotCnt: number;
    cfPassCnt: number;
    cfFailCnt: number;
    cfPassRate: number;
    cfFailRate: number;
  };
}

// 금일 얼굴인증현황(1:1&1:N)
export const getTodayTotalFR = () => {
  return client.get('/chart/history/today').then(response => {
    return response.data;
  });
};
interface Param<T> {
  key: string;
  fetchFunc: () => Promise<T>;
}
export function useGetServerData<T>({ key, fetchFunc }: Param<T>) {
  return useQuery('todayTotalFR', getTodayTotalFR);
}

// 일별 얼굴 인증현황
export const getHistoryDailyFR = (day: number) => {
  return client.get(`/chart/history/daily/${day}`);
};
