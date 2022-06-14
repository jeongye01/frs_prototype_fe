import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import * as chartAPI from 'api/chart';
import todayTotalFRCSlice from 'store/slices/chart/todayTotalFRSlice';
import resultSlice from 'store/slices/resultSlice';
import loadingSlice from 'store/slices/loadingSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

const { loadTodayTodalFRData, updateTodayTodalFRState } =
  todayTotalFRCSlice.actions;
const { getResult } = resultSlice.actions;
const { startLoading, finishLoading } = loadingSlice.actions;

function* todayTotalFaceAuthSaga(action: PayloadAction) {
  yield put(startLoading(action.type));
  try {
    const result: AxiosResponse<chartAPI.TodayFRResponse> = yield call(
      chartAPI.todayTotalFaceAuth,
    );
    yield put(updateTodayTodalFRState({ ...result.data }));
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

function* watchTodayTotalFaceAuthSaga() {
  yield takeEvery(loadTodayTodalFRData, todayTotalFaceAuthSaga);
}

export default function* chartSaga() {
  yield all([fork(watchTodayTotalFaceAuthSaga)]);
}


