import client from './client';
import { HistoryDailyFRType, TodayFRType } from 'typeDefs/Chart';

export interface GetTodayFRResponse {
  data: TodayFRType;
}

// 금일 얼굴인증현황(1:1&1:N)
export const getTodayTotalFR = () => {
  return client.get('/chart/history/today').then(response => response.data);
};

export interface HistoryDailyFRParam {
  day: number;
}

export interface GetHistoryDailyFRResponse {
  data: HistoryDailyFRType[];
}

// 일별 얼굴 인증현황
export const getHistoryDailyFR = () => {
  return client.get(`/chart/history/daily/10`).then(response => response.data);
};
