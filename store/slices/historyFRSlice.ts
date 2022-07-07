/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetHistoryFRResponse } from 'api/history';
import { HistoryFRType } from 'typeDefs/HistoryFR';

export interface InitialState {
  data: HistoryFRType[];
  totalPages: number;
}
const initialState: InitialState = {
  data: [] as HistoryFRType[],
  totalPages: 1,
};

export const historyFRSlice = createSlice({
  name: 'HistoryFR',
  initialState,
  reducers: {
    updateHistoryFRState: (
      state,
      { payload }: PayloadAction<GetHistoryFRResponse>,
    ) => {
      state.data = payload.data.content;
      state.totalPages = +payload.data.totalPages;
    },
  },
});

export default historyFRSlice;
