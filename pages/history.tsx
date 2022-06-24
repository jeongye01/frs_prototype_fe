import type { NextPage } from 'next';

import { useAppSelector } from 'hooks/redux';
import Table from 'components/Table';
import Search from 'components/Search';
import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import Link from 'next/link';

const fields = [
  '순번',
  '인증 요청일시',
  '얼굴 ID',
  '단말 ID',
  '단말 번호',
  '매칭 점수',
  '그룹코드',
  '기준 점수',
  '인증결과-코드',
  '인증결과-명',
  '메인 uuid',
];

const History: NextPage = () => {
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
  const [openFRImageModal] = useModal();
  return (
    <>
      {historyFRData.map((history, i) => (
        <tr
          key={history.faceId}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
            {history.sn}
          </td>
          <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
            <Link href={`/history?sn=${history.sn}`} as={`/history`}>
              <button
                onClick={() =>
                  openFRImageModal({ name: modalName.FRImageModal })
                }
                className="text-blue-400"
              >
                {history.requestDt}
              </button>
            </Link>
          </td>
          {Object.values(history)
            .slice(2, 10)
            .map(value => (
              <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
                {value}
              </td>
            ))}
          <td className="text-center   text-sm border border-[#f2f2f2] py-[5px]">
            {history.mainUuid}
          </td>
        </tr>
      ))}
    </>
  );
}
