import client from './client';
import { UserType } from 'typeDefs/User';
import { AuthorType } from 'typeDefs/Author';

export interface GetUsersResponse {
  data: {
    content: UserType[];
    totalPages: number;
  };
}

export interface GetUsersParam {
  page: number;
}

// 관리자 목록 로드
export const getUserList = ({ page }: GetUsersParam) => {
  return client
    .get(`/user?page=${page}&pageSize=15`)
    .then(response => response.data);
};

export interface PostUserQuery {
  authorCd: string; // 권한 코드
  userId: string; //사용자 아이디
  userNm: string; //사용자 이름
  userPw: string;
}
//사용자 등록
export const postUser = (query: PostUserQuery) => {
  return client.post(
    `/user?authorCd=${query.authorCd}&userId=${query.userId}&userNm=${query.userNm}&userPw=${query.userPw}`,
  );
};

export interface PutUserParamNQuery {
  esntlId: string;
  authorCd: string;
  userNm: string;
}

export const putUser = ({ esntlId, authorCd, userNm }: PutUserParamNQuery) => {
  return client.post(`/user/${esntlId}?authorCd=${authorCd}&userNm=${userNm}`);
};

interface CheckDuplicatedParam {
  userId: string;
}
export interface CheckDuplicatedResponse {
  resultCode: string;
}
export const checkDuplicated = ({ userId }: CheckDuplicatedParam) => {
  return client
    .get(`/user/duplicate/${userId}`)
    .then(response => response.data);
};

export interface GetAuthorsResponse {
  data: {
    content: AuthorType[];
  };
}
// 권한 목록
export const getAuthors = () => {
  return client.get(`/author`).then(response => response.data);
};

export interface PostUseYnParam {
  esntlId: string;
  useYn: 'Y' | 'N';
}

export const postUseYn = ({ esntlId, useYn }: PostUseYnParam) => {
  return client.post(`/user/${esntlId}/useYn?useYn=${useYn}`);
};

//비밀번호 초기화

export interface PostInitPwParam {
  esntlId: string;
}

export const postInitPw = ({ esntlId }: PostInitPwParam) => {
  return client.post(`/user/resetUserPw/${esntlId}`);
};
