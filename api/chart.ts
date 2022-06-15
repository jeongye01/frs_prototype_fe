import client from './client';

export interface TodayFRResponse {
  cfTotCnt: number;
  cfPassCnt: number;
  cfFailCnt: number;
  cfPassRate: number;
  cfFailRate: number;
}

// 금일 얼굴인증현황(1:1&1:N)
export const todayTotalFR = () => {
  return client.get('/chart/history/today');
};
// 일별 얼굴 인증현황
export const historyDailyFR = (day: number) => {
  return client.get(`/chart/history/daily/${day}`);
};
