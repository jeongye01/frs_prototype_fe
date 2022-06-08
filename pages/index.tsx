import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import BarChart from 'components/chart/BarChart';
import PieChart from 'components/chart/PieChart';
import Table, { BaseTbodyRowStyle } from 'components/Table';
import dynamic from 'next/dynamic';
import User from 'components/User';

const fields = [
  '순번',
  '인증요청일시',
  '고객번호',
  'UUID',
  '인증결과',
  '매칭점수',
  '기준점수',
  '(a)특징점추출시간(ms)',
  '(a+α)전체처리시간(ms)',
];
const values = [
  {
    order: '1',
    date: '2022-06-02 17:44:32',
    customNum: 'SYSTEM',
    uuid: '77BA0C26-5867-440E-95AE-44FBFBF4B38A',
    result: '성공',
    matchingScore: '0.970',
    baseScore: '0.650',
    aTime: '118.5494',
    alphaTime: '127.5057',
  },
];
const Home: NextPage = () => {
  return (
    <>
      <BarChart />
      <PieChart />
      <Table
        fields={fields}
        tbodyRow={
          <>
            {Object.values(values[0]).map((value, i) => (
              <td
                className={`${BaseTbodyRowStyle} ${
                  i === 1 ? 'text-[#11b2db]' : ''
                } ${i === 5 ? 'text-blue-800' : ''}  ${
                  i === 6 ? 'text-green-800' : ''
                }`}
              >
                {value}
              </td>
            ))}
          </>
        }
      />
      <User />
    </>
  );
};

export default Home;
