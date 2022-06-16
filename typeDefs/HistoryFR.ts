export interface HistoryFRType {
  sn: number; //순번
  requestDt: string; //인증 요청을
  faceId: string; // 얼굴 ID
  deviceId: string; // 단말 ID
  deviceNm: null; // 단말 번호
  score: string; // 매칭 점수
  groupCd: null; // 그룹코드
  threshold: string; // 기준 점수
  resultCd: '성공' | '실패'; // 인증결과-코드
  resultNm: string; // 인증결과-명
  image1Path: string; // 이미지1 경로
  image2Path: string; //이미지2 경로
  mainUuid: string; //메인 uuid
}
