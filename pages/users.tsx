import type { NextPage } from 'next';
import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import Table from 'components/Table';
import Search from 'components/Search';
import useGetActionState from 'hooks/useGetActionState';
import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import User from 'components/User';
import userListSlice from 'store/slices/userListSlice';
import { BaseTbodyRowStyle } from 'components/Table';
import Link from 'next/link';

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
  '편집',
  '비밀번호',
];

const Users: NextPage = () => {
  const [openUserAddModal] = useModal();
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
    } else {
      // fail
    }
    initResult();
  }, [result, initResult]);
  return (
    <div className=" px-4 flex flex-col   items-start  mt-12 bg-[#f5f7fc] ">
      <button
        onClick={() => openUserAddModal({ name: modalName.UserAddModal })}
        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        👷 사용자 추가
      </button>
      <div className="mb-5" />
      <Table fields={fields} tbodyRows={<UserRows />} />
    </div>
  );
};

export default Users;

function UserRows() {
  const [isUsed, setIsUsed] = useState(true);
  const { data: userList } = useAppSelector(store => store.userList);
  const [openUserEditModal] = useModal();
  const onUseButtonClick = () => {
    setIsUsed(prev => !prev);
  };

  const router = useRouter();
  return (
    <>
      {userList.map((user, i) => (
        <tr
          key={user.esntlId}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          {Object.values(user)
            .slice(1, -1)
            .map(value => (
              <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
                {value}
              </td>
            ))}
          <td className="text-center  text-sm  border border-[#f2f2f2] py-[5px]">
            <button className="bg-blue-500 text-xs text-white py-1 px-3 rounded absolute -translate-x-1/2 -translate-y-1/2">
              {Object.values(user).slice(-1)}
            </button>
          </td>
          <td className="text-center  text-sm border border-[#f2f2f2] py-[5px]">
            <Link href={`/users/?user=${user.esntlId}`} as={`/users`}>
              <button
                onClick={() => {
                  openUserEditModal({
                    name: modalName.UserEditModal,
                  });
                }}
                className="bg-blue-500 text-xs text-white py-1 px-3 rounded absolute -translate-x-1/2 -translate-y-1/2"
              >
                편집
              </button>
            </Link>
          </td>
          <td className="text-center  text-sm border border-[#f2f2f2] py-[5px]">
            <button className="bg-green-700  text-xs text-white p-1 rounded absolute -translate-x-1/2 -translate-y-1/2">
              초기화
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
