import React from 'react';
import { Card, CardHeader, CardBody } from '@material-tailwind/react';
import { colors } from '@material-tailwind/react/types/generic';

type Fields = string | JSX.Element;
interface Props<T> {
  fields: Fields[];
  rows?: T[]; //generic으로 바꾸기
  tbodyRows?: React.ReactNode;
  tbodyTrStyle?: string;
  tbodyThStyle?: string;
  color: colors;
  title: string;
}
function Table<T>({
  fields,
  rows,
  tbodyRows,
  color,
  title,
  tbodyThStyle,
  tbodyTrStyle,
}: Props<T>) {
  return (
    <Card>
      <CardHeader color={color} className=" flex items-center py-2 px-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-1 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
        </svg>
        <h2 className="text-white text-xl">{title}</h2>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {fields?.map(field => (
                  <th
                    scope="col"
                    className={`px-2 text-${color}-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center`}
                  >
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tbodyRows ?? (
                <>
                  {rows?.map((row: T, idx) => (
                    <tr key={idx} className={tbodyTrStyle}>
                      {Object.values(row).map((value, i) => (
                        <th className={tbodyThStyle}>{value}</th>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
export default Table;
