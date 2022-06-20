/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateUserQuery } from 'api/user';
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
    createUser: (state, action: PayloadAction<CreateUserQuery>) => {},
  },
});

export default userSlice;
