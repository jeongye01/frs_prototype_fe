import type { NextPage } from 'next';
import { useEffect, useReducer, useState } from 'react';
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

const fields = [<Checkbox color="indigo" />, '메뉴분류', '메뉴명'];

const Users: NextPage = () => {
  const queryClient = useQueryClient();
  const exclData = queryClient.getQueryData(['author-menu', 'excl']);

  useEffect(() => {
    console.log(exclData);
  }, [exclData]);
  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-80" />
      <div className="px-3 md:px-8 -mt-72 mb-12">
        <div className="mb-10" />
        <div className="relative grid grid-cols-2 gap-36 px-36 ">
          <Table
            fields={fields}
            tbodyRows={<ExclRows />}
            color="indigo"
            title="전체메뉴"
          />
          <div className="absolute left-1/2 -translate-x-20  flex flex-col mx-16 items-center space-y-4 mt-80">
            <IconButton color="green" className="rounded-full">
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
            fields={fields}
            tbodyRows={<InclRows />}
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

function ExclRows() {
  const { data } = useQuery<
    GetAuthorMenuResponse,
    AxiosError,
    AuthorMenuType[]
  >(['author-menu', 'excl'], () => getAuthorMenuExcl({ authorCd: '00008' }), {
    select: res => res.data,
  });

  return (
    <>
      {data?.map(menu => (
        <tr
          key={nanoid()}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          <td className="text-center   text-sm border border-[#f2f2f2]">
            <Checkbox color="indigo" />
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
function InclRows() {
  const { data } = useQuery<
    GetAuthorMenuResponse,
    AxiosError,
    AuthorMenuType[]
  >(['author-menu', 'incl'], () => getAuthorMenuIncl({ authorCd: '00008' }), {
    select: res => res.data,
  });

  return (
    <>
      {data?.map(menu => (
        <tr
          key={nanoid()}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          <td className="text-center   text-sm border border-[#f2f2f2]">
            <Checkbox color="indigo" />
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
