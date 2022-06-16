/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryFRListQuery } from 'api/history';
import { HistoryFRType } from 'typeDefs/HistoryFR';

export interface InitialState {
  data: HistoryFRType[];
}
const initialState: InitialState = {
  data: [] as HistoryFRType[],
};

export const historyFRSlice = createSlice({
  name: 'HistoryFR',
  initialState,
  reducers: {
    loadHistoryFRData: (state, action: PayloadAction<HistoryFRListQuery>) => {},
    updateHistoryFRState: (
      state,
      { payload }: PayloadAction<HistoryFRType[]>,
    ) => {
      console.log('히스토리', payload);

      state.data = [...payload];
    },
  },
});

export default historyFRSlice;
