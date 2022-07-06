import type { NextPage } from 'next';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Table from 'components/Table';
import Link from 'next/link';
import { useQuery, QueryCache, useQueryClient, useMutation } from 'react-query';
import {
  GetAuthorMenuResponse,
  getAuthorMenuExcl,
  getAuthorMenuIncl,
} from 'api/author';
import { AuthorMenuType } from 'typeDefs/Author';
import { AxiosError } from 'axios';
import { UserType } from 'typeDefs/User';
import LoadingSpinner from 'components/Loading/Spinner';
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Checkbox,
} from '@material-tailwind/react';

import { nanoid } from 'nanoid';

const Users: NextPage = () => {
  const { data: exclData } = useQuery<
    GetAuthorMenuResponse,
    AxiosError,
    AuthorMenuType[]
  >(['author-menu', 'excl'], () => getAuthorMenuExcl({ authorCd: '00008' }), {
    select: res => res.data,
    onSuccess: res => setExclState(res),
  });
  const { data: inclData } = useQuery<
    GetAuthorMenuResponse,
    AxiosError,
    AuthorMenuType[]
  >(['author-menu', 'incl'], () => getAuthorMenuIncl({ authorCd: '00008' }), {
    select: res => res.data,
    onSuccess: res => setInclState(res),
  });
  const [exclState, setExclState] = useState<AuthorMenuType[]>(exclData ?? []);
  const [inclState, setInclState] = useState<AuthorMenuType[]>(inclData ?? []);
  const [isExclAllChecked, setIsExclAllChecked] = useState<boolean>(false);
  const [isInclAllChecked, setIsInclAllChecked] = useState<boolean>(false);
  const [checkedExclItems, setCheckedExclItems] = useState(
    new Set<AuthorMenuType>(),
  );
  const [checkedInclItems, setCheckedInclItems] = useState(
    new Set<AuthorMenuType>(),
  );
  const isExclAllCheckHandler = () => {
    if (!exclState) return;
    setCheckedExclItems(new Set([...exclState]));
    setIsExclAllChecked(prev => !prev);
  };
  const fieldsExcl = [
    <Checkbox onClick={isExclAllCheckHandler} color="indigo" />,
    '메뉴분류',
    '메뉴명',
  ];
  const fieldsIncl = [
    <Checkbox
      onClick={() => setIsInclAllChecked(prev => !prev)}
      color="indigo"
    />,
    '메뉴분류',
    '메뉴명',
  ];

  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-80" />
      <div className="px-3 md:px-8 -mt-72 mb-12">
        <div className="mb-10" />
        <div className="relative grid grid-cols-2 gap-36 px-36 ">
          <div className="relative">
            <Table
              fields={fieldsExcl}
              tbodyRows={
                <Rows
                  data={exclState}
                  isAllChecked={isExclAllChecked}
                  checkedItems={checkedExclItems}
                />
              }
              color="indigo"
              title="전체메뉴"
            />
          </div>
          <div className="absolute left-1/2 -translate-x-20  flex flex-col mx-16 items-center space-y-4 mt-80">
            <IconButton
              onClick={() => {
                setCheckedExclItems(new Set<AuthorMenuType>());
                setExclState(prev =>
                  prev.filter(menu => !checkedExclItems.has(menu)),
                );
                setInclState(prev => [...prev, ...checkedExclItems]);
              }}
              color="green"
              className="rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </IconButton>
            <IconButton color="grey" className="rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </IconButton>
          </div>
          <Table
            fields={fieldsIncl}
            tbodyRows={
              <Rows
                data={inclState}
                isAllChecked={isInclAllChecked}
                checkedItems={checkedInclItems}
              />
            }
            color="indigo"
            title="권한에 적용될 메뉴"
          />
        </div>
        <div className="mb-8 " />
      </div>
    </>
  );
};

export default Users;
/*

 <div className="bg-light-blue-500 px-3 md:px-8 h-80" />
      <div className="px-3 md:px-8 -mt-72 mb-12">
        <Card className=" w-fit ">
          <CardBody className="py-4">
            <Search curPage={curPage} setCurPage={setCurPage} />
          </CardBody>
        </Card>
        <div className="mb-14" />
*/

interface Props {
  data: AuthorMenuType[] | undefined;
  isAllChecked: boolean;
  checkedItems: Set<AuthorMenuType>;
}
function Rows({ data, isAllChecked, checkedItems }: Props) {
  return (
    <>
      {data?.map(menu => (
        <tr
          key={nanoid()}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          <td className="text-center   text-sm border border-[#f2f2f2]">
            <AuthorMenuCheckBox
              menu={menu}
              isAllChecked={isAllChecked}
              checkedItems={checkedItems}
            />
          </td>
          <td className="text-center   text-sm border border-[#f2f2f2] ">
            {menu.menuClNm}
          </td>
          <td className="text-center   text-sm border border-[#f2f2f2]">
            {menu.menuNm}
          </td>
        </tr>
      ))}
    </>
  );
}

interface CheckProps {
  isAllChecked: boolean;
  menu: AuthorMenuType;
  checkedItems: Set<AuthorMenuType>;
}
function AuthorMenuCheckBox({ isAllChecked, menu, checkedItems }: CheckProps) {
  const [isChecked, setIsChecked] = useState(isAllChecked);
  const checkedItemHandler = () => {
    if (!isChecked) {
      checkedItems.add(menu);
    } else {
      checkedItems.delete(menu);
    }
    console.log(checkedItems);
    setIsChecked(prev => !prev);
  };
  return (
    <button onClick={checkedItemHandler}>
      <Checkbox color="indigo" value={menu.menuCd} checked={isChecked} />
    </button>
  );
}
