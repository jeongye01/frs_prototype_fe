import client from './client';
import { UserType } from 'typeDefs/User';

export interface LoadUsersResponse {
  data: {
    content: UserType[];
  };
}

// 관리자 목록 로드
export const getUserList = () => {
  return client.get('/user?page=0&pageSize=20');
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
