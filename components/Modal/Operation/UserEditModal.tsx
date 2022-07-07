import React, { ChangeEvent, ReactNode, useReducer } from 'react';
import { putUser, GetAuthorsResponse, getAuthors } from 'api/user';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { AuthorType } from 'typeDefs/Author';
import {
  Button,
  Dialog,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';

export interface IForm {
  authorCd: string; // 권한 코드
  userNm: string; //사용자 이름
}
export interface Action {
  type: 'authorCd' | 'userNm' | 'init';
  payload?: string;
}
const initialState: IForm = {
  authorCd: '',
  userNm: '',
};

function formReducer(state: IForm, action: Action) {
  if (action.type === 'init') return initialState;
  return { ...state, [action.type]: action.payload };
}
interface Props {
  isModalOpen: boolean;
  modalHandler: () => void;
}

export default function UserEditModal({ isModalOpen, modalHandler }: Props) {
  const queryClient = useQueryClient();
  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const { isLoading, mutate } = useMutation(
    () =>
      putUser({
        authorCd: formState.authorCd,
        userNm: formState.userNm,
        esntlId: router.query.esntlId as string,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        modalHandler();
        formDispatch({
          type: 'init',
        });
        alert('사용자 정보 변경 완료');
      },
      onError: () => {
        alert('사용자 정보 변경 실패');
      },
    },
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

  return (
    <Dialog
      open={isModalOpen}
      handler={modalHandler}
      size="xs"
      className="p-10 overflow-y-scroll"
    >
      <form onSubmit={onSubmit} className=" space-y-4">
        <Input label="아이디" type="text" value={router.query.userId} />

        <Select
          onChange={(event: ReactNode) =>
            formDispatch({
              type: 'authorCd',
              payload: event?.toString() as string,
            })
          }
          size="md"
          variant="outlined"
          label="권한"
        >
          {authors?.map(author => (
            <Option key={author.authorCd} value={author.authorCd}>
              {author.authorNm}
            </Option>
          ))}
        </Select>

        <Input
          label="이름"
          type="text"
          value={formState.userNm}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            formDispatch({
              type: 'userNm',
              payload: event.currentTarget.value,
            })
          }
        />

        <div className="space-x-3 flex justify-center">
          <Button type="submit">저장</Button>

          <Button onClick={modalHandler} color="grey">
            취소
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
