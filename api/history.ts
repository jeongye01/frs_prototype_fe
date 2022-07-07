import client from './client';
import { HistoryFRType } from 'typeDefs/HistoryFR';
export interface HistoryFRListQuery {
  pageSize: number;
  page: number;
  searchDateFrom: string;
  searchDateTo: string;
  resultCd: 1 | 0 | null;
}

export interface GetHistoryFRResponse {
  data: { content: HistoryFRType[]; totalPages: string };
}

// 얼굴인증이력조회(1:N)
export const getHistoryFR = ({
  pageSize,
  page,
  searchDateFrom,
  searchDateTo,
  resultCd,
}: HistoryFRListQuery) => {
  return client
    .get(
      `/history/iden/list?pageSize=${pageSize}&page=${page}${
        resultCd === null ? '' : `&resultCd=${resultCd}`
      }&searchDateFrom=${searchDateFrom}&searchDateTo=${searchDateTo}`,
    )
    .then(response => {
      return response.data;
    });
};

interface HistoryFRImageQuery {
  sn: number;
}
//얼굴인증이력(1:N) 이미지1 (base64 byte)
export const getHistoryFRImage1 = ({ sn }: HistoryFRImageQuery) => {
  return client.get(`/history/iden/${sn}/image1`).then(response => {
    return response.data;
  });
};

//얼굴인증이력(1:N) 이미지2 (base64 byte)
export const getHistoryFRImage2 = ({ sn }: HistoryFRImageQuery) => {
  return client
    .get(`/history/iden/${sn}/image2`)
    .then(response => response.data);
};
