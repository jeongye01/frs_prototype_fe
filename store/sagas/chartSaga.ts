import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import * as chartAPI from 'api/chart';
import todayTotalFRCSlice from 'store/slices/chart/todayTotalFRSlice';
import historyDailyFRSlice from 'store/slices/chart/historyDailyFRSlice';
import resultSlice from 'store/slices/resultSlice';
import loadingSlice from 'store/slices/loadingSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

const { loadTodayTodalFRData, updateTodayTodalFRState } =
  todayTotalFRCSlice.actions;

const { updateHistoryDailyFRState, loadHistoryDailyFRData } =
  historyDailyFRSlice.actions;

const { getResult } = resultSlice.actions;
const { startLoading, finishLoading } = loadingSlice.actions;

function* todayTotalFRSaga(action: PayloadAction) {
  yield put(startLoading(action.type));
  try {
    const result: AxiosResponse = yield call(chartAPI.todayTotalFR);

    yield put(updateTodayTodalFRState({ ...result.data.data }));
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

function* historyDailyFRSaga(action: PayloadAction<number>) {
  const day = action.payload;
  yield put(startLoading(action.type));
  try {
    const result: AxiosResponse = yield call(chartAPI.historyDailyFR, day);

    yield put(updateHistoryDailyFRState({ ...result.data.data }));
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

function* watchTodayTotalFRSaga() {
  yield takeEvery(loadTodayTodalFRData, todayTotalFRSaga);
}

function* watchHistoryDailyFRSaga() {
  yield takeEvery(loadHistoryDailyFRData, historyDailyFRSaga);
}

export default function* chartSaga() {
  yield all([fork(watchTodayTotalFRSaga), fork(watchHistoryDailyFRSaga)]);
}
