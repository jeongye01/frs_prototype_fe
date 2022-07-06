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

export const getAuthorMenu = () => {
  return client.get(`/authormenu`).then(res => res.data);
};

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

// 권한 메뉴 등록
export interface PostAuthorMenuQuery {
  authorCd: string;
  menuCds: string;
}
export const postAuthorMenu = ({ authorCd, menuCds }: PostAuthorMenuQuery) => {
  return client
    .post(`/authormenu?authorCd=${authorCd}&menuCds=${menuCds}`)
    .then(res => res.data);
};
