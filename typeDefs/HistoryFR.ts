export interface HistoryFRType {
  sn: number; // 순번
  requestDt: string; //인증 요청일
  faceId: string; //얼굴 ID
  score: number; //매칭 점수
  threshold: number; //기준 점수
  resultCd: '1' | '0'; // 인증결과-코드
  deviceId: string; // 단말 번호
  deviceNm: null; // 단말 이름
  groupCd: null; //그룹 코드
}
