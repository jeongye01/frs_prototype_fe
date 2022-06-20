import type { NextPage } from 'next';
import { useEffect, useReducer } from 'react';

import { useAppSelector, useAppDispatch } from 'hooks/redux';
import Table from 'components/Table';
import Search from 'components/Search';
import useGetActionState from 'hooks/useGetActionState';
import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import User from 'components/User';
import userListSlice from 'store/slices/userListSlice';

const fields = [
  '순번',
  '사용자 아이디',
  '사용자 이름',
  '권한 코드',
  '권한 이름',
  '암호 변경 여부',
  '암호 오류 횟수',
  '마지막 접속 일시',
  '등록일자',
  '사용여부',
];

const Users: NextPage = () => {
  const [openUserMgtModal] = useModal();
  const [loading, result, initResult] = useGetActionState(
    userListSlice.actions.loadUserListData.type,
  );
  const dispatch = useAppDispatch();
  const { data: userList } = useAppSelector(store => store.userList);
  useEffect(() => {
    if (loading) return;
    dispatch(userListSlice.actions.loadUserListData());
  }, [dispatch]);
  useEffect(() => {
    if (result?.isSuccess) {
      // success
      console.log(userList);
    } else {
      // fail
    }
    initResult();
  }, [result, initResult]);
  return (
    <div className=" px-4 flex flex-col   items-start  mt-12 bg-[#f5f7fc] ">
      <button
        onClick={() => openUserMgtModal({ name: modalName.UserMgtModal })}
      >
        추가
      </button>
      <div className="mb-10" />
      <Table fields={fields} rows={userList} />
    </div>
  );
};

export default Users;
