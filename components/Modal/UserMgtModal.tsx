import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import React, { ChangeEvent, useEffect, useReducer } from 'react';

import useGetActionState from 'hooks/useGetActionState';
import userSlice from 'store/slices/userSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux';

export interface IForm {
  authorCd: string; // 권한 코드
  userId: string; //사용자 아이디
  userNm: string; //사용자 이름
  userPw: string;
}
export interface Action {
  type: 'authorCd' | 'userId' | 'userNm' | 'userPw';

  payload: string;
}
const initialState: IForm = {
  authorCd: '',
  userId: '',
  userNm: '',
  userPw: '',
};

function formReducer(state: IForm, action: Action) {
  return { ...state, [action.type]: action.payload };
}

export default function UserMgtModal() {
  const [_, closeUserMgtModal] = useModal();
  const dispatch = useAppDispatch();
  const [formState, formDispatch] = useReducer(formReducer, initialState);
  //  const { data: historyFRData } = useAppSelector(state => state.user);
  const [loading, result, initResult] = useGetActionState(
    userSlice.actions.createUser.type,
  );
  //,
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (loading) return;
    const { authorCd, userId, userNm, userPw } = formState;
    console.log(formState);
    if (!authorCd.trim() || !userId.trim() || !userNm.trim() || !userPw.trim())
      return;

    dispatch(
      userSlice.actions.createUser({
        authorCd,
        userId,
        userNm,
        userPw,
      }),
    );
  };
  useEffect(() => {
    if (result?.isSuccess) {
      closeUserMgtModal({ name: modalName.UserMgtModal });
      alert('사용자 등록 완료');
    }
    initResult();
  }, [result]);
  return (
    <div className="w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white text-center border p-10">
      <form onSubmit={onSubmit} className=" space-y-4">
        <div className="flex">
          <span className=" w-1/6 grid place-items-center  text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
            권한 코드
          </span>
          <input
            type="text"
            className="outline-none rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
            value={formState.authorCd}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formDispatch({
                type: 'authorCd',
                payload: event.currentTarget.value,
              })
            }
          />
        </div>
        <div className="flex">
          <span className=" w-1/6 grid place-items-center  text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
            아이디
          </span>
          <input
            type="text"
            className="outline-none rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
            value={formState.userId}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formDispatch({
                type: 'userId',
                payload: event.currentTarget.value,
              })
            }
          />
        </div>
        <div className="flex">
          <span className="w-1/6  grid place-items-center text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
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
        <div className="flex">
          <span className="w-1/6  grid place-items-center text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
            비밀번호
          </span>
          <input
            type="password"
            className="outline-none rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
            value={formState.userPw}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formDispatch({
                type: 'userPw',
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
            onClick={() => closeUserMgtModal({ name: modalName.UserMgtModal })}
            className="text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
