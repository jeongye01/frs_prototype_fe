import { all, fork } from 'redux-saga/effects';
import chartSaga from './chartSaga';
import historyFRSaga from './historyFRSaga';
import userListSaga from './userListSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([
    fork(chartSaga),
    fork(historyFRSaga),
    fork(userListSaga),
    fork(userSaga),
  ]);
}
