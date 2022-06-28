/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadUsersResponse } from 'api/user';
import { UserType } from 'typeDefs/User';

export interface InitialState {
  data: UserType[];
  totalPages: number;
}
const initialState: InitialState = {
  data: [] as UserType[],
  totalPages: 1,
};

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    updateUserListState: (
      state,
      { payload }: PayloadAction<LoadUsersResponse>,
    ) => {
      state.data = Object.values(payload.data.content).map(row => {
        const {
          esntlId,
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
          esntlId,
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
      console.log(+payload.data.totalPages);
      state.totalPages = +payload.data.totalPages;
    },
  },
});

export default userListSlice;
