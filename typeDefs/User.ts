export interface UserType {
  esntl_id: number; //순번
  userId: string; //사용자 아이디
  userNm: string; //사용자 이름
  authorCd: string; //권한 코드
  authorNm: string; // 권한 이름
  pwUpdtYn: string; //암호 변경 여부
  pwFailrCnt: number; //암호 오류 횟수
  lastConectDt: string; //마지막 접속 일시
  registDt: string; // 등록일자
  roles: string; //권한
  useYn: string; //사용여부
}
