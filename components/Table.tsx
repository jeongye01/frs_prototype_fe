import React from 'react';
export const BaseTbodyRowStyle =
  'text-center border border-[#cccccc] whitespace-nowrap px-6 py-[5px]';
interface Props {
  fields: string[];
  values?: any; //generic으로 바꾸기
  tbodyRow?: React.ReactNode;
}
function Table({ fields, values, tbodyRow }: Props) {
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
          {[1, 1, 1, 1, 1, 1, 1].map((_, idx) => (
            <tr key={idx} className="border-b  odd:bg-white even:bg-[#f7f7f7] ">
              {tbodyRow ||
                Object.values(values[0]).map((value, i) => (
                  <td className="text-center border border-[#cccccc] whitespace-nowrap px-6 py-[5px]">
                    {value}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Table;
