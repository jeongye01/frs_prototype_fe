import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import Table from 'components/Table/Layout';
import useModal from 'hooks/useModal';
import userListSlice from 'store/slices/userListSlice';
import Link from 'next/link';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import Pagination from 'components/Pagination';
import {
  GetUsersResponse,
  getUserList,
  postUseYn,
  PostUseYnParam,
  postInitPw,
} from 'api/user';
import { AxiosError } from 'axios';

import { Button, Card } from '@material-tailwind/react';
import UserAddModal from 'components/Modal/Operation/UserAddModal';
import UserEditModal from 'components/Modal/Operation/UserEditModal';

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
  const [curPage, setCurPage] = useState<number>(1);
  const { totalPages } = useAppSelector(state => state.userList);
  const dispatch = useAppDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddModalOpen = () => setIsAddModalOpen(!isAddModalOpen);

  const { data, isLoading, isFetching, refetch } = useQuery<
    GetUsersResponse,
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
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-80" />
      <div className="px-3 md:px-8 -mt-72 mb-12">
        <Card className=" w-fit ">
          <Button
            onClick={handleAddModalOpen}
            color="green"
            className="text-[16px]"
          >
            사용자 추가 +
          </Button>
        </Card>

        <div className="mb-10" />
        <Table
          fields={fields}
          tbodyRows={<UserRows />}
          color="indigo"
          title="사용자 목록"
        />
        <div className="mb-8 " />
        <Pagination
          numOfPages={totalPages}
          numOfPageBtn={4}
          curPage={curPage}
          setCurPage={setCurPage}
        />
      </div>
      <UserAddModal
        isModalOpen={isAddModalOpen}
        modalHandler={handleAddModalOpen}
      />
    </>
  );
};

export default Users;

function UserRows() {
  const queryClient = useQueryClient();
  const { data: userList, totalPages } = useAppSelector(
    store => store.userList,
  );
  const [openUserEditModal] = useModal();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => setIsEditModalOpen(!isEditModalOpen);
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
                user?.useYn === 'Y' ? 'bg-blue-500' : 'bg-grey-500'
              } text-xs text-white py-1  p-[4px] rounded absolute -translate-x-1/2 -translate-y-1/2`}
            >
              {user?.useYn === 'Y' ? '사용중' : '사용안함'}
            </button>
          </td>
          <td className="text-center  text-sm border border-[#f2f2f2] py-[5px]">
            <Link
              href={`/operation/users?esntlId=${user.esntlId}&userId=${user.userId}`}
              as={`/operation/users`}
            >
              <button
                onClick={handleEditModalOpen}
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
              className="bg-[#4BAF50]  text-xs text-white p-[4px] rounded absolute -translate-x-1/2 -translate-y-1/2"
            >
              초기화
            </button>
          </td>
        </tr>
      ))}
      <UserEditModal
        isModalOpen={isEditModalOpen}
        modalHandler={handleEditModalOpen}
      />
    </>
  );
}
