import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import React, { ChangeEvent, useEffect, useReducer } from 'react';

import useGetActionState from 'hooks/useGetActionState';
import userSlice from 'store/slices/userSlice';
import { useAppDispatch } from 'hooks/redux';
import {
  putUser,
  EditUserParamNQuery,
  GetAuthorsResponse,
  getAuthors,
} from 'api/user';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { AuthorType } from 'typeDefs/Author';

export interface IForm {
  authorCd: string; // 권한 코드
  userNm: string; //사용자 이름
}
export interface Action {
  type: 'authorCd' | 'userNm';
  payload: string;
}
const initialState: IForm = {
  authorCd: '',
  userNm: '',
};

function formReducer(state: IForm, action: Action) {
  return { ...state, [action.type]: action.payload };
}

export default function UserEditModal() {
  const [_, closeUserEditModal] = useModal();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const { isSuccess, isError, isLoading, mutate } = useMutation(() =>
    putUser({
      authorCd: formState.authorCd,
      userNm: formState.userNm,
      esntlId: router.query.esntlId as string,
    }),
  );
  const { data: authors } = useQuery<
    GetAuthorsResponse,
    AxiosError,
    AuthorType[]
  >(['users', 'authors'], getAuthors, { select: data => data.data.content });

  const router = useRouter();
  //,
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const { authorCd, userNm } = formState;

    if (!authorCd.trim() || !userNm.trim()) return;
    if (!router.query.esntlId) return;
    mutate();
  };

  useEffect(() => {
    //실패 경우 넣기
    if (!isSuccess) return;
    queryClient.invalidateQueries(['users']);
    closeUserEditModal({ name: modalName.UserEditModal });
    alert('사용자 정보 변경 완료');
  }, [isSuccess]);
  return (
    <form onSubmit={onSubmit} className=" space-y-4">
      <div className="flex">
        <span className=" w-1/5 px-1 grid place-items-center whitespace-nowrap text-[12px] text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
          아이디
        </span>
        <div className="outline-none rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  ">
          {router.query.userId}
        </div>
      </div>
      <div className="flex">
        <span className=" w-1/5 px-1 grid place-items-center whitespace-nowrap text-[12px] text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
          권한
        </span>
        <select
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            formDispatch({
              type: 'authorCd',
              payload: event.currentTarget.value,
            })
          }
          className="outline-none rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
        >
          <option key="선택">선택</option>
          {authors?.map(author => (
            <option
              key={author.authorCd}
              value={author.authorCd}
              selected={formState.authorCd === author.authorCd}
            >
              {author.authorNm}
            </option>
          ))}
        </select>
      </div>

      <div className="flex">
        <span className=" w-1/5 px-1 grid place-items-center whitespace-nowrap text-[12px] text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
          이름
        </span>
        <input
          type="text"
          className="outline-none rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
          value={formState.userNm}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            formDispatch({
              type: 'userNm',
              payload: event.currentTarget.value,
            })
          }
        />
      </div>

      <div className="space-x-3">
        <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
          저장
        </button>
        <button
          onClick={() => {
            closeUserEditModal({ name: modalName.UserEditModal });
          }}
          className="text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          취소
        </button>
      </div>
    </form>
  );
}
