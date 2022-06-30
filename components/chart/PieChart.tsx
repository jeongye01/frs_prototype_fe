import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  data: number[];
  labels: string[];
  colors: string[];
}
function PieChart({ data, labels, colors }: Props) {
  const state = {
    series: data, //^
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
                //fontFamily: {
                //notoSansKR: ['Noto Sans KR', 'sans-serif'],
                //},
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
      colors,
      labels, //^
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
    <>
      {data?.length === colors?.length && colors?.length === labels?.length && (
        <div className="pointer-events-none">
          <ReactApexChart
            type="donut"
            series={state.series}
            options={state.options}
            width="100%"
          />
        </div>
      )}
    </>
  );
}
export default PieChart;
