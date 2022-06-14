import client from './client';

export interface TodayFRResponse {
  cfTotCnt: number;
  cfPassCnt: number;
  cfFailCnt: number;
  cfPassRate: number;
  cfFailRate: number;
}

// 금일 얼굴인증현황(1:1&1:N)
export const todayTotalFaceAuth = () => {
  return client.get('/chart/history/today');
};

export const today1NFaceAuth = () => {
  return client.get('/chart/identification/today');
};

export const todayNNFaceAuth = () => {
  return client.get('/chart/verification/today');
};
