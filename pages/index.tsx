import type { NextPage } from 'next';

import TodayTotalFRChart from 'components/chartBoard/TodayTotalFRChart';
import HistoryDailyFRChart from 'components/chartBoard/HistoryDailyFRChart';
import Table from 'components/Table';

const fields = [
  '순번',
  '사용자 아이디',
  '사용자 이름',
  '권한 코드',
  '권한 이름',
  '암호 변경 여부',
  '암호 오류 횟수',
  '마지막 접속 일시',
  '등록일자',
  '권한',
  '사용여부',
];

const values = [
  {
    order: '1',
    id: 'dev',
    name: '개발자SH',
    authority: '전체관리자',
    lastAccessDate: '2022-06-08 09:58:59',
    passwordErrorCount: '0',
    isPasswordChanged: 'Y',
    passwordChangeDays: '30',
    registerDate: '2021-10-14',
    isUsed: '사용중',
    edit: '편집',
  },
];

const Home: NextPage = () => {
  return (
    <div className="px-32   justify-between my-12 bg-[#f5f7fc] ">
      <div className="gap-12 h-[360px] mb-1  flex items-start">
        <div className="w-2/5 h-4/5 ">
          <TodayTotalFRChart />
        </div>
        <div className="w-3/5 h-4/5 ">
          <HistoryDailyFRChart />
        </div>
      </div>
      <Table
        fields={fields}
        rows={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => values[0])}
      />
    </div>
  );
};

export default Home;
//
// <HistoryDailyFRChart />
