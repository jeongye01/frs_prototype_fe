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
