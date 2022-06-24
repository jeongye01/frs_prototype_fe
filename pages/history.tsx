import type { NextPage } from 'next';
import { useAppSelector } from 'hooks/redux';
import Table from 'components/Table';
import Search from 'components/Search';
import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import Link from 'next/link';
import Pagination from 'components/Pagination';
import { useState } from 'react';

const fields = [
  '순번',
  '인증 요청일',
  '얼굴 ID',
  '매칭 점수',
  '기준 점수',
  '인증결과-코드',
  '단말 번호',
  '단말 이름',
  '그룹 코드',
];

const History: NextPage = () => {
  const [curPage, setCurPage] = useState<number>(1);
  const { totalPages } = useAppSelector(state => state.historyFR);
  console.log(totalPages);
  return (
    <div className=" px-4 flex flex-col   items-start  mt-12 bg-[#f5f7fc] ">
      <Search />
      <div className="mb-10" />
      <Table fields={fields} tbodyRows={<HistoryRows />} />
      <div className="mb-10" />
      <Pagination
        numOfPages={totalPages}
        numOfPageBtn={4}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </div>
  );
};

export default History;

function HistoryRows() {
  const { data: historyFRData, totalPages } = useAppSelector(
    state => state.historyFR,
  );
  const [openFRImageModal] = useModal();
  console.log(historyFRData, totalPages);
  return (
    <>
      {historyFRData.map((history, i) => (
        <tr
          key={`${history.faceId}-${history.sn}`}
          className="border-b   odd:bg-white even:bg-[#F9F9F9]"
        >
          {Object.values(history)
            .slice(0, -2)
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
