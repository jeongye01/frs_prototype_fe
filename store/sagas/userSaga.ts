import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import * as userAPI from 'api/user';

import resultSlice from 'store/slices/resultSlice';
import loadingSlice from 'store/slices/loadingSlice';

import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import userSlice from 'store/slices/userSlice';
import userListSlice from 'store/slices/userListSlice';
import { UserType } from 'typeDefs/User';

const { createUser } = userSlice.actions;
const { loadUserListData } = userListSlice.actions;
const { getResult } = resultSlice.actions;
const { startLoading, finishLoading } = loadingSlice.actions;

function* createUserSaga(action: PayloadAction<userAPI.CreateUserQuery>) {
  const body = action.payload;
  yield put(startLoading(action.type));
  try {
    const result: AxiosResponse = yield call(userAPI.postUser, { ...body });
    console.log(result);
    yield put(loadUserListData());
    yield put(getResult({ isSuccess: true, actionType: action.type }));
  } catch (error) {
    yield put(
      getResult({
        isSuccess: false,
        actionType: action.type,
        errorMsg: String(error),
      }),
    );
  }
  yield put(finishLoading(action.type));
}

function* watchCreateUserSaga() {
  yield takeEvery(createUser, createUserSaga);
}

export default function* userSaga() {
  yield all([fork(watchCreateUserSaga)]);
}
