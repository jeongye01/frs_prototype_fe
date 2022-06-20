/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'typeDefs/User';

export interface InitialState {
  data: UserType[];
}
const initialState: InitialState = {
  data: [] as UserType[],
};

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    loadUserListData: (state, action: PayloadAction) => {},
    updateUserListState: (state, { payload }: PayloadAction<UserType[]>) => {
      console.log(Object.values(payload), payload);
      state.data = Object.values(payload).map(row => {
        const {
          esntl_id,
          userId,
          userNm,
          authorCd,
          authorNm,
          pwUpdtYn,
          pwFailrCnt,
          lastConectDt,
          registDt,

          useYn,
        } = row;
        return {
          esntl_id,
          userId,
          userNm,
          authorCd,
          authorNm,
          pwUpdtYn,
          pwFailrCnt,
          lastConectDt,
          registDt,

          useYn,
        };
      });
    },
  },
});

export default userListSlice;
