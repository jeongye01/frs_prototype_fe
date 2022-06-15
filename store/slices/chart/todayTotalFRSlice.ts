/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodayFRType } from 'typeDefs/Chart';

export interface InitialState {
  data: TodayFRType;
}

const initialState: InitialState = {
  data: {} as TodayFRType,
};

export const todayTotalFRCSlice = createSlice({
  name: 'todayTotalFRChartData',
  initialState,
  reducers: {
    loadTodayTodalFRData: state => {},
    updateTodayTodalFRState: (
      state,
      { payload }: PayloadAction<TodayFRType>,
    ) => {
      state.data = {
        ...state.data,
        ...payload,
      };
    },
  },
});

export default todayTotalFRCSlice;
