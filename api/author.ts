import client from './client';
import { UserType } from 'typeDefs/User';
import { AuthorType } from 'typeDefs/Author';

export interface PostAuthorQuery {
  authorCd?: string;
  authorDesc?: string;
  authorNm: string;
  sortOrdr: number;
  useYn: 'Y' | 'N';
}

export const getUserList = ({
  authorCd,
  authorDesc,
  authorNm,
  sortOrdr,
  useYn,
}: PostAuthorQuery) => {
  return client.get(`/author?authorNm=123&sortOrdr=123&useYn=Y`);
};

export interface CreateUserQuery {
  authorCd: string; // 권한 코드
  userId: string; //사용자 아이디
  userNm: string; //사용자 이름
  userPw: string;
}
//사용자 등록
export const postUser = (query: CreateUserQuery) => {
  // http://172.16.107.111:6772/v1/user?authorCd=a&userId=a&userNm=a&userPw=a
  return client.post(
    `/user?authorCd=${query.authorCd}&userId=${query.userId}&userNm=${query.userNm}&userPw=${query.userPw}`,
  );
};
