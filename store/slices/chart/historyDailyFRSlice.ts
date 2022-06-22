/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryDailyFRType } from 'typeDefs/Chart';

export interface InitialState {
  statDes: string[];
  reqeustCnts: number[];
  succesCnts: number[];
  failrCnts: number[];
  crttCls: null;
}
const initialState: InitialState = {
  statDes: [],
  reqeustCnts: [],
  succesCnts: [],
  failrCnts: [],
  crttCls: null,
};

export const historyDailyFRSlice = createSlice({
  name: 'historyDailyFRTypeData',
  initialState,
  reducers: {
    loadHistoryDailyFRData: (state, action: PayloadAction<number>) => {},
    updateHistoryDailyFRState: (
      state,
      { payload }: PayloadAction<HistoryDailyFRType[]>,
    ) => {
      state.statDes = [...Object.values(payload).map(data => data.statDe)];
      state.failrCnts = [...Object.values(payload).map(data => data.failrCnt)];
      state.reqeustCnts = [
        ...Object.values(payload).map(data => data.reqeustCnt),
      ];
      state.succesCnts = [
        ...Object.values(payload).map(data => data.succesCnt),
      ];
    },
  },
});

export default historyDailyFRSlice;
