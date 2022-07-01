import React from 'react';
import { Card, CardHeader, CardBody } from '@material-tailwind/react';
export const BaseTbodyRowStyle =
  'text-center border border-[#f2f2f2] whitespace-nowrap px-6 py-[5px]';
interface Props<T> {
  fields: string[];
  rows?: T[]; //generic으로 바꾸기
  tbodyRows?: React.ReactNode;
}
function Table<T>({ fields, rows, tbodyRows }: Props<T>) {
  return (
    <Card>
      <CardHeader color="purple" className="flex items-center py-2 px-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-1 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
        </svg>
        <h2 className="text-white text-xl">인증 이력</h2>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {fields?.map(field => (
                  <th
                    scope="col"
                    className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center"
                  >
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tbodyRows || null}
              {rows?.map((row: T, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                >
                  {Object.values(row).map((value, i) => (
                    <th>{value}</th>
                  ))}
                </tr>
              )) || null}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
export default Table;

/*
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
        {tbodyRows || null}
        {rows?.map((row: T, idx) => (
          <tr key={idx} className="border-b  odd:bg-white even:bg-[#F9F9F9] ">
            {Object.values(row).map((value, i) => (
              <td className="text-center  text-sm border border-[#f2f2f2] py-[5px] ">
                {value}
              </td>
            ))}
          </tr>
        )) || null}
      </tbody>
    </table>
  );




*/
