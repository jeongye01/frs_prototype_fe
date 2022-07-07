import { useAppSelector } from 'hooks/redux';
import Link from 'next/link';
import Table from './Layout';

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

export default function FRSHistoryTable() {
  return (
    <Table
      fields={fields}
      color="purple"
      tbodyRows={<FRSHistoryRows />}
      title="인증 이력"
    />
  );
}

function FRSHistoryRows() {
  const { data: historyFRData, totalPages } = useAppSelector(
    state => state.historyFR,
  );
  const baseThStyle =
    'border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-2 text-center';
  return (
    <>
      {historyFRData.map((history, i) => (
        <tr key={`${history.faceId}-${history.sn}`} className="">
          <th className={baseThStyle}>{history.sn}</th>

          <th className={baseThStyle}>
            <Link href={`/frs-history?sn=${history.sn}`} as={`/frs-history`}>
              <button>
                {history.requestDt
                  ?.replace('T', ' ')
                  .replace(/\..*/, '')
                  .slice(0, -3)}
              </button>
            </Link>
          </th>
          {Object.values(history)
            .slice(2, -2)
            .map(value => (
              <th className={baseThStyle}>{value}</th>
            ))}
        </tr>
      ))}
    </>
  );
}
