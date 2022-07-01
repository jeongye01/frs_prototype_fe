import { useEffect } from 'react';

import { Card, CardBody, CardHeader } from '@material-tailwind/react';
import HistoryDailyFRChart from './chartBoard/HistoryDailyFRChart';

export default function ChartLine() {
  return (
    <Card>
      <CardHeader color="orange" className="p-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-1 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
        </svg>
        <h2 className="text-white text-xl">일별 얼굴인증현황</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-64">
          <HistoryDailyFRChart />
        </div>
      </CardBody>
    </Card>
  );
}
