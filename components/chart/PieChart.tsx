import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
function PieChart() {
  const state = {
    series: [
      {
        data: [33, 33, 0],
      },
    ],
    options: {
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false,
          columnWidth: '65%',
          endingShape: 'rounded',
          dataLabels: {
            position: 'top',
          },
        },
      },
      column: {
        colors: ['#662e8f', '#2e368f', '#5c7fd6'],
      },
      dataLabels: {
        enabled: true,
        position: 'top',
        offsetY: -30,

        style: {
          fontSize: '16px',
          colors: ['#662e8f', '#2e368f', '#5c7fd6'],
        },
      },

      xaxis: {
        categories: ['인증 요청', '인증 성공', '인증 실패'],
        axisBorder: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        colors: ['#662e8f', '#2e368f', '#5c7fd6'],
        opacity: 1,
      },
      legend: {
        show: false,
      },
      chart: {
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        type="bar"
        series={state.series}
        options={state.options}
        width="30%"
        height="200px"
      />
    </div>
  );
}
export default PieChart;
