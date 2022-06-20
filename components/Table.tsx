import React from 'react';
export const BaseTbodyRowStyle =
  'text-center border border-[#f2f2f2] whitespace-nowrap px-6 py-[5px]';
interface Props<T> {
  fields: string[];
  rows?: T[]; //generic으로 바꾸기
  tbodyRow?: React.ReactNode;
}
function Table<T>({ fields, rows, tbodyRow }: Props<T>) {
  return (
    <table className=" w-full text-sm shadow rounded-2xl text-left text-black border-collapse border border-[#f2f2f2]  ">
      <thead className=" text-black text-xs  uppercase bg-[#EBEBED]">
        <tr>
          {fields.map(field => (
            <th
              scope="col"
              className=" py-2 text-center text-semibold border border-[#f2f2f2] whitespace-nowrap"
            >
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row: T, idx) => (
          <tr key={idx} className="border-b  odd:bg-white even:bg-[#F9F9F9] ">
            {tbodyRow ||
              Object.values(row).map((value, i) => (
                <td className="text-center  text-sm border border-[#f2f2f2] py-[5px] ">
                  {value}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
