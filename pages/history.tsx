import type { NextPage } from 'next';

import { useAppSelector } from 'hooks/redux';
import Table from 'components/Table';
import Search from 'components/Search';

const fields = [
  '순번',
  '인증 요청일',
  '얼굴 ID',
  '단말 ID',

  '매칭 점수',

  '기준 점수',

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
      <Table fields={fields} tbodyRows={<HistoryRows />} />
    </div>
  );
};

export default History;

function HistoryRows() {
  const { data: historyFRData } = useAppSelector(state => state.historyFR);

  return (
    <>
      {historyFRData.map((history, i) => (
        <tr
          key={history.faceId}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          {Object.values(history)
            .slice(0, 4)
            .map(value => (
              <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
                {value}
              </td>
            ))}
          <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
            {history.score}
          </td>
          <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
            {history.threshold}
          </td>
          {Object.values(history)
            .slice(9)
            .map(value => (
              <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
                {value}
              </td>
            ))}
        </tr>
      ))}
    </>
  );
}
