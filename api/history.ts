import client from './client';

export interface HistoryFRListQuery {
  pageSize: number;
  page: number;
  searchDateFrom: string;
  searchDateTo: string;
  resultCd: 1 | 0 | null;
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
  pageSize,
  page,
  searchDateFrom,
  searchDateTo,
  resultCd,
}: HistoryFRListQuery) => {
  console.log(
    resultCd,
    resultCd === 0,
    `/history/identification/list?pageSize=${pageSize}&page=${page}${
      resultCd === null ? `` : `&resultCd=${resultCd}`
    }&searchDateFrom=${searchDateFrom}&searchDateTo=${searchDateTo}`,
  );
  return client.get(
    `/history/identification/list?pageSize=${pageSize}&page=${page}${
      resultCd === null ? '' : `&resultCd=${resultCd}`
    }&searchDateFrom=${searchDateFrom}&searchDateTo=${searchDateTo}`,
  );
};
