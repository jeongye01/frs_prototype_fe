import client from './client';
import { UserType } from 'typeDefs/User';
import { AuthorType, AuthorMenuType } from 'typeDefs/Author';

export interface PostAuthorQuery {
  authorCd?: string;
  authorDesc?: string;
  authorNm: string;
  sortOrdr: number;
  useYn: 'Y' | 'N';
}

export interface GetAuthorMenuResponse {
  data: AuthorMenuType[];
}
export interface GetAuthorMenuQuery {
  authorCd: string; // 권한 코드
}
// 권한에 포함되지 않은 메뉴목록
export const getAuthorMenuExcl = ({ authorCd }: GetAuthorMenuQuery) => {
  return client
    .get(`/authormenu/excl?authorCd=${authorCd}`)
    .then(res => res.data);
};

// 권한에 대한 메뉴목록
export const getAuthorMenuIncl = ({ authorCd }: GetAuthorMenuQuery) => {
  return client
    .get(`/authormenu/incl?authorCd=${authorCd}`)
    .then(res => res.data);
};
