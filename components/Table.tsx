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

function Table() {
  return (
    <>
      <table className="w-full text-sm  text-left text-gray-500 border-collapse border border-[#cccccc]  ">
        <thead className=" text-gray-700 text-xs uppercase bg-[#eaecf0]">
          <tr>
            {fields.map(field => (
              <th
                scope="col"
                className="px-6 py-2 text-center text-semibold border border-[#cccccc] whitespace-nowrap"
              >
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 1, 1, 1, 1, 1, 1].map(() => (
            <>
              <tr className="border-b  odd:bg-white even:bg-[#f7f7f7] ">
                {Object.values(values[0]).map((value, i) => (
                  <td
                    className={`text-center border border-[#cccccc] whitespace-nowrap px-6 py-[5px] ${
                      i === 1 ? 'text-[#11b2db]' : ''
                    } ${i === 5 ? 'text-blue-800' : ''}  ${
                      i === 6 ? 'text-green-800' : ''
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Table;
