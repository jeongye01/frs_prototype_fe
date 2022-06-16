import { all, fork } from 'redux-saga/effects';
import chartSaga from './chartSaga';
import historyFRSaga from './historyFRSaga';

export default function* rootSaga() {
  yield all([fork(chartSaga), fork(historyFRSaga)]);
}
