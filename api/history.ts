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

interface HistoryFRImageQuery {
  sn: number;
}
//얼굴인증이력(1:N) 이미지1 (base64 byte)
export const getHistoryFRImage1 = ({ sn }: HistoryFRImageQuery) => {
  return client.get(`/history/identification/${sn}/image1`).then(response => {
    console.log(response);
    return response.data;
  });
};

//얼굴인증이력(1:N) 이미지2 (base64 byte)
export const getHistoryFRImage2 = ({ sn }: HistoryFRImageQuery) => {
  return client
    .get(`/history/identification/${sn}/image2`)
    .then(response => response.data);
};
