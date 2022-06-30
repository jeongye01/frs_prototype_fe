import { useEffect } from 'react';

import { Card, CardBody, CardHeader } from '@material-tailwind/react';

export default function ChartLine() {
  return (
    <Card>
      <CardHeader color="orange">
        <h6 className="uppercase text-gray-200 text-xs font-medium">
          Overview
        </h6>
        <h2 className="text-white text-2xl">Sales value</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="line-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}
