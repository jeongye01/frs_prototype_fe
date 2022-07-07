import type { NextPage } from 'next';
import { useAppSelector } from 'hooks/redux';
import Search from 'components/Search';
import Pagination from 'components/Pagination';
import { useState } from 'react';
import { Card, CardBody } from '@material-tailwind/react';
import FRSHistoryTable from 'components/Table/FRSHistory';

const FRSHistory: NextPage = () => {
  const [curPage, setCurPage] = useState<number>(1);
  const { totalPages } = useAppSelector(state => state.historyFR);

  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-80" />
      <div className="px-3 md:px-8 -mt-72 mb-12">
        <Card className=" w-fit ">
          <CardBody className="py-4">
            <Search curPage={curPage} setCurPage={setCurPage} />
          </CardBody>
        </Card>
        <div className="mb-14" />
        <FRSHistoryTable />
        <div className="mb-6" />
        <Pagination
          numOfPages={totalPages}
          numOfPageBtn={4}
          curPage={curPage}
          setCurPage={setCurPage}
        />
      </div>
    </>
  );
};
export default FRSHistory;
