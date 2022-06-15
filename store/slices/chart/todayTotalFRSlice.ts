/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodayFRChart } from 'typeDefs/Chart';

export interface InitialState {
  data: TodayFRChart;
}

const initialState: InitialState = {
  data: {} as TodayFRChart,
};

export const todayTotalFRCSlice = createSlice({
  name: 'todayTotalFRChartData',
  initialState,
  reducers: {
    loadTodayTodalFRData: state => {},
    updateTodayTodalFRState: (
      state,
      { payload }: PayloadAction<TodayFRChart>,
    ) => {
      state.data = {
        ...state.data,
        ...payload,
      };
    },
  },
});

export default todayTotalFRCSlice;
