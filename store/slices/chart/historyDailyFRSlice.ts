/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryDailyFRChart } from 'typeDefs/Chart';

export interface InitialState {
  data: HistoryDailyFRChart[];
}

const initialState: InitialState = {
  data: [] as HistoryDailyFRChart[],
};

export const historyDailyFRSlice = createSlice({
  name: 'historyDailyFRChartData',
  initialState,
  reducers: {
    loadHistoryDailyFRData: (state, action: PayloadAction<number>) => {},
    updateHistoryDailyFRState: (
      state,
      { payload }: PayloadAction<HistoryDailyFRChart>,
    ) => {
      state.data = {
        ...state.data,
        ...payload,
      };
    },
  },
});

export default historyDailyFRSlice;
