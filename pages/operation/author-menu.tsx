import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Table from 'components/Table/Layout';
import { useQuery, useMutation } from 'react-query';
import {
  GetAuthorMenuResponse,
  getAuthorMenuExcl,
  getAuthorMenuIncl,
  postAuthorMenu,
} from 'api/author';
import { AuthorMenuType, AuthorType } from 'typeDefs/Author';
import { AxiosError } from 'axios';

import {
  Button,
  IconButton,
  Checkbox,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';

import { nanoid } from 'nanoid';
import { getAuthors, GetAuthorsResponse } from 'api/user';

const Users: NextPage = () => {
  const [authorSelected, setAuthorSelected] = useState<{
    authorCd: string;
    authorNm: string;
  }>();
  const { data: exclData, refetch: exclRefetch } = useQuery<
    GetAuthorMenuResponse,
    AxiosError,
    AuthorMenuType[]
  >(
    ['author-menu', 'excl'],
    () => getAuthorMenuExcl({ authorCd: authorSelected?.authorCd ?? '' }),
    {
      select: res => res.data,
      onSuccess: res => setExclState(res.sort((a, b) => +a.menuCd - +b.menuCd)),
    },
  );
  const { data: inclData, refetch: inclRefetch } = useQuery<
    GetAuthorMenuResponse,
    AxiosError,
    AuthorMenuType[]
  >(
    ['author-menu', 'incl'],
    authorSelected?.authorCd
      ? () => getAuthorMenuIncl({ authorCd: authorSelected?.authorCd })
      : () => ({} as GetAuthorMenuResponse),
    {
      select: res => res.data,
      onSuccess: res =>
        setInclState(res?.sort((a, b) => +a.menuCd - +b.menuCd)),
    },
  );
  const { mutate: save } = useMutation(postAuthorMenu, {
    onSuccess: () => {
      alert('저장되었습니다');
    },
    onError: () => {
      alert('저장 실패');
    },
  });
  const { data: authors } = useQuery<
    GetAuthorsResponse,
    AxiosError,
    AuthorType[]
  >(['users', 'authors'], getAuthors, { select: data => data.data.content });

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

    if (!isExclAllChecked) {
      setCheckedExclItems(new Set([...exclState]));
    } else {
      setCheckedExclItems(new Set<AuthorMenuType>());
    }

    setIsExclAllChecked(prev => !prev);
  };
  const isInclAllCheckHandler = () => {
    if (!inclState) return;
    if (!isInclAllChecked) {
      setCheckedInclItems(new Set([...inclState]));
    } else {
      setCheckedInclItems(new Set<AuthorMenuType>());
    }
    setIsInclAllChecked(prev => !prev);
  };
  const fieldsExcl = [
    <Checkbox
      onClick={isExclAllCheckHandler}
      checked={isExclAllChecked}
      color="indigo"
    />,
    '메뉴분류',
    '메뉴명',
  ];
  const fieldsIncl = [
    <Checkbox
      onClick={isInclAllCheckHandler}
      checked={isInclAllChecked}
      color="indigo"
    />,
    '메뉴분류',
    '메뉴명',
  ];
  useEffect(() => {
    exclRefetch();
    inclRefetch();
  }, [authorSelected]);
  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-80" />

      <div className="px-3 md:px-8 -mt-80 mb-12 relative">
        <div className="w-1/6 ml-36">
          <Menu>
            <MenuHandler>
              <Button size="md" color="indigo" variant="gradient">
                {authorSelected?.authorNm ?? '권한 구분'}
              </Button>
            </MenuHandler>

            <MenuList>
              {authors?.map(author => (
                <MenuItem>
                  <button
                    onClick={() => {
                      setAuthorSelected({
                        authorCd: author.authorCd,
                        authorNm: author.authorNm,
                      });
                    }}
                    className="w-full h-full"
                  >
                    {author.authorNm}
                  </button>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-36 px-36 ">
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
          <div className="absolute left-1/2 -translate-x-20 -top-10 flex flex-col mx-16 items-center space-y-4 mt-80">
            <IconButton
              onClick={() => {
                setIsExclAllChecked(prev => prev && false);
                setCheckedExclItems(new Set<AuthorMenuType>());
                setExclState(prev =>
                  prev
                    .filter(menu => !checkedExclItems.has(menu))
                    .sort((a, b) => +a.menuCd - +b.menuCd),
                );
                setInclState(prev => [
                  ...prev,
                  ...[...checkedExclItems].sort(
                    (a, b) => +a.menuCd - +b.menuCd,
                  ),
                ]);
              }}
              color="indigo"
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
            <IconButton
              onClick={() => {
                setIsInclAllChecked(prev => prev && false);
                setCheckedInclItems(new Set<AuthorMenuType>());
                setInclState(prev =>
                  prev.filter(menu => !checkedInclItems.has(menu)),
                );
                setExclState(prev => [
                  ...prev,
                  ...[...checkedInclItems].sort(
                    (a, b) => +a.menuCd - +b.menuCd,
                  ),
                ]);
              }}
              color="grey"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </IconButton>
            <IconButton
              onClick={() => {
                if (!authorSelected?.authorCd) return;
                save({
                  authorCd: authorSelected?.authorCd,
                  menuCds: inclState.map(incl => incl.menuCd).join(','),
                });
              }}
              color="green"
              className="rounded-full whitespace-nowrap"
            >
              저장
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
