import React, {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useReducer,
} from 'react';
import historyFRSlice from 'store/slices/historyFRSlice';
import { useAppDispatch } from 'hooks/redux';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getHistoryFR, GetHistoryFRResponse } from 'api/history';
import { leadingZeros } from 'utils/dateFormat';
import { Select, Option, Input, Button } from '@material-tailwind/react';

export interface IForm {
  pageSize: number | null;
  page: number | null;
  searchDateFrom: string;
  searchDateTo: string;
  resultCd: 1 | 0 | -1;
}
export interface Action {
  type:
    | 'countPerPage'
    | 'page'
    | 'searchDateFrom'
    | 'searchDateTo'
    | 'resultCd'
    | 'init';
  payload?: string | number | null;
}

const getDefaultDateFrom = () => {
  const date = new Date();

  return `${date.getFullYear()}-01-01`;
};
const getDefaultDateTo = () => {
  const date = new Date();

  return `${date.getFullYear()}-${leadingZeros(
    date.getMonth() + 1,
    2,
  )}-${leadingZeros(date.getDate(), 2)}`;
};

const initialState: IForm = {
  pageSize: 20,
  page: 0,
  searchDateFrom: getDefaultDateFrom(),
  searchDateTo: getDefaultDateTo(),
  resultCd: -1,
};
function formReducer(state: IForm, action: Action) {
  if (action.type === 'init') return initialState;
  return { ...state, [action.type]: action.payload };
}
interface Props {
  curPage: number;
  setCurPage: Dispatch<SetStateAction<number>>;
}

function Search({ curPage, setCurPage }: Props) {
  const dispatch = useAppDispatch();
  const { refetch } = useQuery<GetHistoryFRResponse, AxiosError>(
    ['history', 'historyFR'],
    () =>
      getHistoryFR({
        pageSize: 20,
        page: curPage - 1,
        searchDateFrom: formState.searchDateFrom,
        searchDateTo: formState.searchDateTo,
        resultCd:
          ((+formState.resultCd === -1 ? null : formState.resultCd) as
            | 1
            | 0
            | null) || null,
      }),
    {
      onSuccess: res =>
        dispatch(historyFRSlice.actions.updateHistoryFRState(res)),
    },
  );

  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <form onSubmit={onSubmit} className="flex space-x-4 px-4 items-center">
      <div className="flex items-center ">
        <span className="mr-3 whitespace-nowrap">인증요청일자</span>
        <Input
          label="from"
          type="date"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            formDispatch({
              type: 'searchDateFrom',
              payload: event.currentTarget.value,
            })
          }
          value={formState.searchDateFrom}
        />
        <span className="mx-3 text-xl">~</span>
        <Input
          label="to"
          type="date"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            formDispatch({
              type: 'searchDateTo',
              payload: event.currentTarget.value,
            })
          }
          value={formState.searchDateTo}
        />
      </div>

      <div className="w-50 ">
        <Select
          onChange={(event: ReactNode) =>
            formDispatch({
              type: 'resultCd',
              payload: event?.toString(),
            })
          }
          size="md"
          variant="outlined"
          label="인증결과"
        >
          <Option value={'-1'} defaultChecked>
            전체
          </Option>
          <Option value={'1'}>성공</Option>
          <Option value={'0'}>실패</Option>
        </Select>
      </div>

      <Button type="submit" color="green" className="">
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
      </Button>
      <Button
        type="button"
        onClick={() =>
          formDispatch({
            type: 'init',
          })
        }
      >
        초기화
      </Button>
    </form>
  );
}
export default Search;
