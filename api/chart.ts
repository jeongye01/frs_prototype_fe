import client from './client';

interface IFaceAuthData {
  cfTotCnt: number;
  cfPassCnt: number;
  cfFailCnt: number;
  cfPassRate: 0;
  cfFailRate: 0;
}
// 금일 얼굴인증현황(1:1&1:N)
export const todayTotalFaceAuthChart = () => {
  return client.get('/chart/history/today');
};

export const today1NFaceAuthChart = () => {
  return client.get('/chart/identification/today');
};

export const todayNNFaceAuthChart = () => {
  return client.get('/chart/verification/today');
};
