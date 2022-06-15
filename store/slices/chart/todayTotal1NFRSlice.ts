/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TodayFRChart from 'typeDefs/TodayFEChart';

export interface InitialState {
  data: TodayFRChart;
}

const initialState: InitialState = {
  data: {} as TodayFRChart,
};

export const todayTotal1NFRCSlice = createSlice({
  name: 'todayTotal1NFRChartData',
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

export default todayTotal1NFRCSlice;
