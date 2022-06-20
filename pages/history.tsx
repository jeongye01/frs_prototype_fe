import type { NextPage } from 'next';

import { useAppSelector } from 'hooks/redux';
import Table from 'components/Table';
import Search from 'components/Search';

const fields = [
  '순번',
  '인증 요청을',
  '얼굴 ID',
  '단말 ID',
  '단말 번호',
  '매칭 점수',
  '그룹코드',
  '기준 점수',
  '인증결과-코드',
  '인증결과-명',
  '이미지1 경로',
  '이미지2 경로',
  '메인 uuid',
];

const History: NextPage = () => {
  const { data: historyFRData } = useAppSelector(state => state.historyFR);
  return (
    <div className=" px-4 flex flex-col   items-start  mt-12 bg-[#f5f7fc] ">
      <Search />
      <div className="mb-10" />
      <Table fields={fields} rows={historyFRData} />
    </div>
  );
};

export default History;