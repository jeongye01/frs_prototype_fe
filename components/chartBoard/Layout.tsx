import type { NextPage } from 'next';

interface Props {
  title: string;
  onRefreshClick: () => void;
  children: React.ReactNode;
}
export default function ChartBoardLayout({
  title,
  onRefreshClick,
  children,
}: Props) {
  return (
    <>
      <div className="flex flex-col items-center shadow-md min-w-[250px] h-full  w-full rounded-lg bg-white">
        <div className="flex items-center justify-between p-3 w-full text-base    border-b rounded-t-lg border-b-gray-300 bg-[#3b75e3] ">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <h2 className="text-white">{title}</h2>
          </div>
          <button onClick={() => onRefreshClick()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
