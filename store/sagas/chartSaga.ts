import { call, put, takeEvery } from 'redux-saga/effects';
import * as chartAPI from 'api/chart';



function* todayTotalFaceAuthSaga() {
  try {
    const data: = yield call(chartAPI.todayTotalFaceAuthChart, a);
    yield put({ type: 'USER_FETCH_SUCCEEDED', user: user });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}

export default mySaga;
