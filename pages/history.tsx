import type { NextPage } from 'next';
import { useEffect, useReducer } from 'react';

import useGetActionState from 'hooks/useGetActionState';
import historyFRSlice from 'store/slices/historyFRSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import Table from 'components/Table';
import Search from 'components/Search';

const fields = [
  '순번',
  '인증요청일시',
  '고객번호',
  'UUID',
  '인증결과',
  '매칭점수',
  '기준점수',
  '(a)특징점추출시간(ms)',
  '(a+α)전체처리시간(ms)',
];
const values = [
  {
    order: '1',
    date: '2022-06-02 17:44:32',
    customNum: 'SYSTEM',
    uuid: '77BA0C26-5867-440E-95AE-44FBFBF4B38A',
    result: '성공',
    matchingScore: '0.970',
    baseScore: '0.650',
    aTime: '118.5494',
    alphaTime: '127.5057',
  },
];
export interface IFormState {
  countPerPage: number | null;
  page: number | null;
  searchDateFrom: string | null;
  searchDateTo: string | null;
  resultCd: 1 | 0 | null;
}
export interface Action {
  type:
    | 'countPerPage'
    | 'page'
    | 'searchDateFrom'
    | 'searchDateTo'
    | ' resultCd';
  payload: string | number | null;
}
const initialState: IFormState = {
  countPerPage: 20,
  page: 0,
  searchDateFrom: null,
  searchDateTo: null,
  resultCd: null,
};
function formReducer(state: IFormState, action: Action) {
  return { ...state, [action.type]: action.payload };
}
const History: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data: historyFRData } = useAppSelector(state => state.historyFR);
  const [loading, result] = useGetActionState(
    historyFRSlice.actions.loadHistoryFRData.type,
  );

  useEffect(() => {
    if (loading) return;
    dispatch(historyFRSlice.actions.loadHistoryFRData({}));
  }, [dispatch]);
  useEffect(() => {
    console.log(result.isSuccess);
  }, [result]);
  return (
    <div className=" px-4 flex flex-col   items-start  mt-12 bg-[#f5f7fc] ">
      <Search />
      <div className="mb-10" />
      <Table fields={fields} values={values} />
    </div>
  );
};

export default History;
