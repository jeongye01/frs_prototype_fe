import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import * as userAPI from 'api/user';

import resultSlice from 'store/slices/resultSlice';
import loadingSlice from 'store/slices/loadingSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import userListSlice from 'store/slices/userListSlice';
import { UserType } from 'typeDefs/User';

const { loadUserListData, updateUserListState } = userListSlice.actions;
const { getResult } = resultSlice.actions;
const { startLoading, finishLoading } = loadingSlice.actions;

function* loadUserListSaga(action: PayloadAction) {
  yield put(startLoading(action.type));
  try {
    const result: AxiosResponse<userAPI.LoadUsersResponse> = yield call(
      userAPI.getUserList,
    );

    yield put(updateUserListState({ ...result.data.data.content }));
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

function* watchLoadUserListSaga() {
  yield takeEvery(loadUserListData, loadUserListSaga);
}

export default function* userListSaga() {
  yield all([fork(watchLoadUserListSaga)]);
}
