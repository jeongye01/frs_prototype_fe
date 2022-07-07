import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  GetAuthorsResponse,
  getAuthors,
  CheckDuplicatedResponse,
  checkDuplicated,
  postUser,
} from 'api/user';
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
  userId: string; //사용자 아이디
  userNm: string; //사용자 이름
  userPw: string;
}
export interface Action {
  type: 'authorCd' | 'userId' | 'userNm' | 'userPw' | 'init';
  payload?: string;
}
const initialState: IForm = {
  authorCd: '',
  userId: '',
  userNm: '',
  userPw: '',
};

function formReducer(state: IForm, action: Action) {
  if (action.type === 'init') return initialState;
  return { ...state, [action.type]: action.payload };
}

interface Props {
  isModalOpen: boolean;
  modalHandler: () => void;
}

export default function UserAddModal({ isModalOpen, modalHandler }: Props) {
  const queryClient = useQueryClient();
  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const [userIdOk, setUserIdOk] = useState<string | null>(null);
  const { isLoading: createUserLoading, mutate: createUser } = useMutation(
    () =>
      postUser({
        authorCd: formState.authorCd,
        userId: formState.userId,
        userNm: formState.userNm,
        userPw: formState.userPw,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        formDispatch({
          type: 'init',
        });
        alert('사용자 등록 완료');
      },
      onError: () => {
        alert('사용자 등록 실패');
      },
    },
  );

  const { data: authors } = useQuery<
    GetAuthorsResponse,
    AxiosError,
    AuthorType[]
  >(['users', 'authors'], getAuthors, { select: data => data.data.content });

  const { refetch: checkIdValidation } = useQuery<
    CheckDuplicatedResponse,
    AxiosError
  >(
    ['users', 'checkDuplicated'],
    () => checkDuplicated({ userId: formState.userId }),
    { enabled: false, onSuccess: res => setUserIdOk(res?.resultCode) },
  );

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (userIdOk === null) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }
    if (createUserLoading) return;
    const { authorCd, userId, userNm, userPw } = formState;

    if (!authorCd.trim() || !userId.trim() || !userNm.trim() || !userPw.trim())
      return;

    createUser();
  };

  useEffect(() => {
    setUserIdOk(null);
    formDispatch({
      type: 'init',
    });
  }, []);
  return (
    <Dialog
      open={isModalOpen}
      handler={modalHandler}
      size="xs"
      className="p-10"
    >
      <form onSubmit={onSubmit} className=" space-y-4">
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

        <div className="flex">
          <Input
            label="아이디"
            type="text"
            value={formState.userId}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setUserIdOk(null);
              formDispatch({
                type: 'userId',
                payload: event.currentTarget.value,
              });
            }}
          />
          <button
            type="button"
            onClick={() => checkIdValidation()}
            className="text-sm text-white whitespace-nowrap bg-blue-500 rounded-lg ml-2 px-2"
          >
            중복확인
          </button>
        </div>
        {userIdOk === 'ok' && (
          <span className="text-sm text-green-500">
            사용가능한 아이디 입니다.
          </span>
        )}
        {userIdOk !== 'ok' && userIdOk !== null && (
          <span className="text-sm text-red-500">
            사용할 수 없는 아이디 입니다.
          </span>
        )}
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
        <Input
          label="비밀번호"
          type="password"
          value={formState.userPw}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            formDispatch({
              type: 'userPw',
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
