import { all } from 'redux-saga/effects'; // 사가 이펙트 all 가져옴

export function* rootSaga() {
  // 루트 사가함수 제작
  yield all([]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootSaga;
