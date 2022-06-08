import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
function PieChart() {
  const state = {
    series: [33, 33, 0],
    options: {
      legend: {
        show: false,
      },

      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                color: undefined,
                offsetY: 0,
              },
              total: {
                show: true,
                label: 'Total',
                color: '#373d3f',
              },
            },
          },
        },
      },

      stroke: {
        width: 0,
      },

      labels: ['인증 요청', '인증 성공', '인증 실패'],
      dataLabels: {
        enabled: true,
        formatter: function (
          value: any,
          { seriesIndex, dataPointIndex, w }: any,
        ) {
          return w.config.series[seriesIndex];
        },
        dropShadow: {
          enabled: false,
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
    },
  };

  return (
    <div className="relative w-fit pointer-events-none">
      <ReactApexChart
        type="donut"
        series={state.series}
        options={state.options}
        width="400px"
      />
    </div>
  );
}
export default PieChart;
