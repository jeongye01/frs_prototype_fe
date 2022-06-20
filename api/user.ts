import client from './client';
import { UserType } from 'typeDefs/User';

export interface LoadUsersResponse {
  content: UserType[];
}

// 관리자 목록 로드
export const getLoadUsers = () => {
  return client.get('/user?page=0&pageSize=20');
};
