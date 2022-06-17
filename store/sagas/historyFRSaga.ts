import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import * as historyAPI from 'api/history';

import resultSlice from 'store/slices/resultSlice';
import loadingSlice from 'store/slices/loadingSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import historyFRSlice from 'store/slices/historyFRSlice';

const { updateHistoryFRState, loadHistoryFRData } = historyFRSlice.actions;
const { getResult } = resultSlice.actions;
const { startLoading, finishLoading } = loadingSlice.actions;

function* hitoryFRSaga(action: PayloadAction<historyAPI.HistoryFRListQuery>) {
  const { pageSize, resultCd, page, searchDateFrom, searchDateTo } =
    action.payload;
  yield put(startLoading(action.type));
  try {
    const result: AxiosResponse = yield call(historyAPI.getHistoryFR, {
      pageSize,
      resultCd,
      page,
      searchDateFrom,
      searchDateTo,
    });

    yield put(updateHistoryFRState({ ...result.data.data }));
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

function* watchHitoryFRSaga() {
  yield takeEvery(loadHistoryFRData, hitoryFRSaga);
}

export default function* chartSaga() {
  yield all([fork(watchHitoryFRSaga)]);
}
