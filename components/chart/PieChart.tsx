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
      chart: {
        events: {
          animationEnd: null,
          beforeMount: null,
          mounted: null,
          updated: null,
          mouseMove: null,
          mouseLeave: null,
          click: null,
          legendClick: null,
          markerClick: null,
          selection: null,
          dataPointSelection: null,
          dataPointMouseEnter: null,
          dataPointMouseLeave: null,
          beforeZoom: null,
          beforeResetZoom: null,
          zoomed: null,
          scrolled: null,
        },
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
      labels: ['인증 요청', '인증 성공', '인증 실패'],
      dataLabels: {
        enabled: false,
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
    },
  };

  return (
    <div>
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
