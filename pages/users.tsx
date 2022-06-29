import type { NextPage } from 'next';
import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import userListSlice from 'store/slices/userListSlice';
import { BaseTbodyRowStyle } from 'components/Table';
import Link from 'next/link';
import { useQuery, QueryCache, useQueryClient, useMutation } from 'react-query';
import Pagination from 'components/Pagination';
import {
  LoadUsersResponse,
  getUserList,
  postUseYn,
  PostUseYnParam,
  postInitPw,
  PostInitPwParam,
} from 'api/user';
import { AxiosError } from 'axios';
import { UserType } from 'typeDefs/User';

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
  const [curPage, setCurPage] = useState<number>(1);
  const { totalPages } = useAppSelector(state => state.userList);
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, refetch } = useQuery<
    LoadUsersResponse,
    AxiosError
  >(['users'], () =>
    getUserList({
      page: curPage - 1,
    }),
  );
  useEffect(() => {
    if (!data) return;
    console.log(isFetching);
    console.log(data, totalPages);
    dispatch(userListSlice.actions.updateUserListState(data));
  }, [data]);
  useEffect(() => {
    refetch();
  }, [curPage]);

  return (
    <div className=" px-4 flex flex-col   items-start  mt-20 mb-10 bg-[#f5f7fc] ">
      <div className="flex items-center">
        <button
          onClick={() => openUserAddModal({ name: modalName.UserAddModal })}
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          👷 사용자 추가
        </button>
        {isFetching && (
          <svg
            role="status"
            className="w-8 h-8 ml-2 text-gray-200 animate-spin fill-blue-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
      </div>
      <div className="mb-5" />

      <Table fields={fields} tbodyRows={<UserRows />} />

      <div className="mb-8 " />
      <Pagination
        numOfPages={totalPages}
        numOfPageBtn={4}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </div>
  );
};

export default Users;

function UserRows() {
  const queryClient = useQueryClient();
  const { data: userList, totalPages } = useAppSelector(
    store => store.userList,
  );
  const [openUserEditModal] = useModal();

  const { mutate: useYnMutate } = useMutation(postUseYn, {
    onSettled: async (_: any, __: any, params: PostUseYnParam) => {
      queryClient.invalidateQueries(['users']);
      const newList = userList.map(user => {
        if (user.esntlId === params.esntlId)
          return { ...user, useYn: params.useYn };
        return user;
      });
      const newUser = userList.filter(user => user.esntlId === params.esntlId);

      await queryClient.cancelQueries(['users']);
      alert('저장되었습니다.');
      queryClient.setQueryData(['users'], {
        data: { content: newList, totalPages },
      });
    },
    onMutate: async (params: PostUseYnParam) => {
      console.log(
        'mutate!',
        userList,
        params,
        userList.map(user => {
          if (user.esntlId === params.esntlId)
            return { ...user, useYn: params.useYn };
          return user;
        }),
      );
    },
  });
  console.log(userList);
  const { mutate: initPwMutate } = useMutation(postInitPw, {
    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries(['users']);
      alert('초기화되었습니다');
    },
  });

  return (
    <>
      {userList === [] && <div>로딩중 </div>}
      {userList?.map((user, i) => (
        <tr
          key={`${user.userId}`}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          {Object.values(user)
            .slice(1, 8)
            .map(value => (
              <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
                {value}
              </td>
            ))}
          <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
            {user?.lastConectDt
              ?.replace('T', ' ')
              .replace(/\..*/, '')
              .slice(0, -3)}
          </td>
          <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
            {user?.registDt?.replace('T', ' ').replace(/\..*/, '').slice(0, -3)}
          </td>
          <td className="text-center  text-sm  border border-[#f2f2f2] py-[5px]">
            <button
              onClick={() => {
                let result = confirm(
                  `${
                    user.useYn === 'Y' ? '사용안함' : '사용함'
                  }으로 변경하시겠습니까? `,
                );
                if (result)
                  useYnMutate({
                    esntlId: user.esntlId,
                    useYn: user.useYn === 'Y' ? 'N' : 'Y',
                  });
              }}
              className={`${
                user?.useYn === 'Y' ? 'bg-blue-500' : 'bg-gray-500'
              } text-xs text-white py-1  p-[4px] rounded absolute -translate-x-1/2 -translate-y-1/2`}
            >
              {user?.useYn === 'Y' ? '사용중' : '사용안함'}
            </button>
          </td>
          <td className="text-center  text-sm border border-[#f2f2f2] py-[5px]">
            <Link
              href={`/users?esntlId=${user.esntlId}&userId=${user.userId}`}
              as={`/users`}
            >
              <button
                onClick={() => {
                  openUserEditModal({
                    name: modalName.UserEditModal,
                  });
                }}
                className="bg-blue-500 text-xs text-white py-1  p-[4px] rounded absolute -translate-x-1/2 -translate-y-1/2"
              >
                편집
              </button>
            </Link>
          </td>
          <td className="text-center  text-sm border border-[#f2f2f2] py-[5px]">
            <button
              onClick={() => {
                let result = confirm(
                  '비밀 번호를 초기화 하시겠습니까? 초기화시 비밀번호는 아이디 + 1234!로 변경이 됩니다.',
                );
                if (result)
                  initPwMutate({
                    esntlId: user.esntlId,
                  });
              }}
              className="bg-green-700  text-xs text-white p-[4px] rounded absolute -translate-x-1/2 -translate-y-1/2"
            >
              초기화
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
