import client from './client';
import { UserType } from 'typeDefs/User';
import { AuthorType } from 'typeDefs/Author';

export interface LoadUsersResponse {
  data: {
    content: UserType[];
    totalPages: number;
  };
}

export interface LoadUsersParam {
  page: number;
}

// 관리자 목록 로드
export const getUserList = ({ page }: LoadUsersParam) => {
  return client
    .get(`/user?page=${page}&pageSize=20`)
    .then(response => response.data);
};

export interface CreateUserQuery {
  authorCd: string; // 권한 코드
  userId: string; //사용자 아이디
  userNm: string; //사용자 이름
  userPw: string;
}

export const postUser = (query: CreateUserQuery) => {
  // http://172.16.107.111:6772/v1/user?authorCd=a&userId=a&userNm=a&userPw=a
  return client.post(
    `/user?authorCd=${query.authorCd}&userId=${query.userId}&userNm=${query.userNm}&userPw=${query.userPw}`,
  );
};

export interface EditUserParamNQuery {
  esntlId: string;
  authorCd: string;
  userNm: string;
}

export const putUser = ({ esntlId, authorCd, userNm }: EditUserParamNQuery) => {
  return client.post(`/user/${esntlId}?authorCd=${authorCd}&userNm=${userNm}`);
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
