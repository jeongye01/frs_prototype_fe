/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TodayFRChart from 'typeDefs/TodayFEChart';

export interface InitialState {
  todayTotalFRChartData: TodayFRChart;
}

const initialState: InitialState = {
  todayTotalFRChartData: {} as TodayFRChart,
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
      state.todayTotalFRChartData = {
        ...state.todayTotalFRChartData,
        ...payload,
      };
    },
  },
});

export default todayTotalFRCSlice;
