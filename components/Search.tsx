import React, { ChangeEvent, useEffect, useReducer } from 'react';

import useGetActionState from 'hooks/useGetActionState';
import historyFRSlice from 'store/slices/historyFRSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux';

export interface IFormState {
  pageSize: number | null;
  page: number | null;
  searchDateFrom: string | null;
  searchDateTo: string | null;
  resultCd: 1 | 0 | -1;
}
export interface Action {
  type:
    | 'countPerPage'
    | 'page'
    | 'searchDateFrom'
    | 'searchDateTo'
    | 'resultCd';
  payload: string | number | null;
}
const initialState: IFormState = {
  pageSize: 20,
  page: 0,
  searchDateFrom: null,
  searchDateTo: null,
  resultCd: -1,
};
function formReducer(state: IFormState, action: Action) {
  return { ...state, [action.type]: action.payload };
}

function Search() {
  const dispatch = useAppDispatch();
  const [formState, formDispatch] = useReducer(formReducer, initialState);
  const { data: historyFRData } = useAppSelector(state => state.historyFR);
  const [loading, result] = useGetActionState(
    historyFRSlice.actions.loadHistoryFRData.type,
  );

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (loading) return;
    const { pageSize, page, searchDateFrom, searchDateTo, resultCd } =
      formState;
    console.log(formState, resultCd, resultCd === -1);
    if (!searchDateFrom?.trim || !searchDateTo?.trim()) return;

    dispatch(
      historyFRSlice.actions.loadHistoryFRData({
        pageSize: 20,
        page: 0,
        searchDateFrom,
        searchDateTo,
        resultCd: (+resultCd === -1 ? null : resultCd) as 1 | 0 | null,
      }),
    );
  };
  useEffect(() => {
    console.log(result?.isSuccess, historyFRData);
  }, [result]);
  return (
    <div className="px-2 rounded shadow bg-white">
      <form onSubmit={onSubmit} className="flex py-2 px-4 items-center">
        <span className="mr-3">인증요청일자</span>
        <div className="relative">
          <input
            type="date"
            className="block px-5 py-2 outline-0  text-sm text-gray-900 bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            required
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formDispatch({
                type: 'searchDateFrom',
                payload: event.currentTarget.value,
              })
            }
            value={formState.searchDateFrom ?? undefined}
          />
        </div>
        <span className="mx-3 text-xl">~</span>
        <div className="relative">
          <input
            type="date"
            className="block px-5 py-2 outline-0  text-sm text-gray-900 bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            required
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formDispatch({
                type: 'searchDateTo',
                payload: event.currentTarget.value,
              })
            }
            value={formState.searchDateTo ?? undefined}
          />
        </div>
        <span className="ml-5 mr-3">인증결과</span>

        <select
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            formDispatch({
              type: 'resultCd',
              payload: event.currentTarget.value,
            })
          }
          value={formState.resultCd ?? undefined}
          className="px-2 py-2 outline-0 text-sm  text-gray-900 bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={-1} selected>
            전체
          </option>
          <option value={1}>성공</option>
          <option value={0}>실패</option>
        </select>
        <button
          type="submit"
          className="text-white  bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 mx-2 "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          초기화
        </button>
      </form>
    </div>
  );
}
export default Search;

function DateInput() {
  return (
    <div className="relative">
      <input
        type="date"
        className="block px-5 py-2 outline-0  text-sm text-gray-900 bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        required
      />
    </div>
  );
}
