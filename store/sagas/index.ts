import { all, fork } from 'redux-saga/effects';
import userListSaga from './userListSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([fork(userListSaga), fork(userSaga)]);
}
