import client from './client';
import { HistoryFRType } from 'typeDefs/HistoryFR';
export interface HistoryFRListQuery {
  countPerPage: number;
  page: number;
  searchDateFrom: string;
  searchDateTo: string;
  resultCd: 1 | 0 | null;
}

export interface HistoryFRResponse {
  data: HistoryFRType[];
}

// 얼굴인증이력조회(1:N)
export const getHistoryFR = ({
  countPerPage,
  page,
  searchDateFrom,
  searchDateTo,
  resultCd,
}: HistoryFRListQuery) => {
  return client
    .get(
      `/history/identification/list?countPerPage=${countPerPage}&page=${page}${
        resultCd === null ? '' : `&resultCd=${resultCd}`
      }&searchDateFrom=${searchDateFrom}&searchDateTo=${searchDateTo}`,
    )
    .then(response => response.data);
};
