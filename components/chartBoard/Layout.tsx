import type { NextPage } from 'next';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/alert';
interface Props {
  title: string;
  onRefreshClick: () => void;
  children: React.ReactNode;
  headerColor: color;
}
export default function ChartBoardLayout({
  title,
  onRefreshClick,
  children,
  headerColor,
}: Props) {
  return (
    <>
      <Card>
        <CardHeader
          color={headerColor}
          className="py-2 px-5 flex items-center justify-between"
        >
          <div className="flex items-center ">
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
          </div>
          <button onClick={onRefreshClick}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </button>
        </CardHeader>
        <CardBody>
          <div className="relative h-64">{children}</div>
        </CardBody>
      </Card>
    </>
  );
}
