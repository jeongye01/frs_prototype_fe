import React from 'react';
export const BaseTbodyRowStyle =
  'text-center border border-[#f2f2f2] whitespace-nowrap px-6 py-[5px]';
interface Props {
  fields: string[];
  values?: any; //generic으로 바꾸기
  tbodyRow?: React.ReactNode;
}
function Table({ fields, values, tbodyRow }: Props) {
  return (
    <table className="w-full text-sm shadow rounded-2xl text-left text-black border-collapse border border-[#f2f2f2]  ">
      <thead className=" text-black text-xs  uppercase bg-[#EBEBED]">
        <tr>
          {fields.map(field => (
            <th
              scope="col"
              className="px-6 py-2 text-center text-semibold border border-[#f2f2f2] whitespace-nowrap"
            >
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[1, 1, 1, 1, 1, 1, 1].map((_, idx) => (
          <tr key={idx} className="border-b  odd:bg-white even:bg-[#F9F9F9] ">
            {tbodyRow ||
              Object.values(values[0]).map((value, i) => (
                <td className="text-center border border-[#f2f2f2]  px-6 py-[5px]">
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
