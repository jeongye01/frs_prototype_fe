/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateUserQuery, EditUserParamNQuery } from 'api/user';
import { UserType } from 'typeDefs/User';

export interface InitialState {
  user: UserType;
}
const initialState: InitialState = {
  user: {} as UserType,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<EditUserParamNQuery>) => {},
  },
});

export default userSlice;
