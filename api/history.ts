import client from './client';

export interface HistoryFRListQuery {
  countPerPage: number;
  page: number;
  searchDateFrom: string;
  searchDateTo: string;
  resultCd: 1 | 0;
}

export interface HistoryFRResponse {
  sn: number;
  requestDt: string;
  faceId: string;
  deviceId: string;
  deviceNm: null;
  score: string;
  groupCd: null;
  threshold: string;
  resultCd: string;
  resultNm: string;
  image1Path: string;
  image2Path: string;
  mainUuid: string;
}

// 얼굴인증이력조회(1:N)
export const getHistoryFR = ({
  countPerPage,
  page,
  searchDateFrom,
  searchDateTo,
  resultCd,
}: HistoryFRListQuery) => {
  return client.get(
    `/history/identification/list?countPerPage=${countPerPage}&page=${page}&resultCd=${resultCd}}&searchDateFrom=${searchDateFrom}&searchDateTo=${searchDateTo}`,
  );
};
