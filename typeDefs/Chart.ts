export interface TodayFRType {
  cfTotCnt: number;
  cfPassCnt: number;
  cfFailCnt: number;
  cfPassRate: number;
  cfFailRate: number;
}
export interface HistoryDailyFRType {
  statDe: string;
  reqeustCnt: number;
  succesCnt: number;
  failrCnt: number;
  crttCls: null;
}
/*
export interface HistoryDailyFRForChartType {
  statDes: string[];
  reqeustCnts: number[];
  succesCnts: number[];
  failrCnts: number[];
  crttCls: null;
}
*/
