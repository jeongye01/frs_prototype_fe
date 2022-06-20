/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'typeDefs/User';

export interface InitialState {
  data: UserType[];
}
const initialState: InitialState = {
  data: [] as UserType[],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUsersData: (state, action: PayloadAction) => {},
    updateUsersState: (state, { payload }: PayloadAction<UserType[]>) => {
      console.log(payload);
      state.data = [...state.data, ...payload];
    },
  },
});

export default userSlice;
