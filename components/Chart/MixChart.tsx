import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  lineName: string;
  lineData: number[];
  bar1Name: string;
  bar1Data: number[];
  bar2Name: string;
  bar2Data: number[];
  categories: string[];
}

export default function MixChart({
  lineName,
  lineData,
  bar1Name,
  bar1Data,
  bar2Name,
  bar2Data,
  categories,
}: Props) {
  const state = {
    series: [
      {
        name: bar1Name,
        type: 'column',
        data: bar1Data,
      },
      {
        name: bar2Name,
        type: 'column',
        data: bar2Data,
      },
      {
        name: lineName,
        type: 'line',
        data: lineData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 2],
      },

      xaxis: {
        categories,
      },
      yaxis: {
        labels: {
          show: true,

          formatter: (value: any, index: number) => {
            return value;
          },
        },
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: 'center',
      },
    },
  };

  return (
    <div className="w-full h-full px-10">
      <ReactApexChart
        type="line"
        series={state.series}
        options={state.options}
        width="100%"
        height="100%"
      />
    </div>
  );
}
