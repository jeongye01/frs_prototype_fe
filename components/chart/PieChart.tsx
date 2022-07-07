import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Color } from 'typeDefs/utils/Color';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

//same length
interface Props {
  data: number[];
  labels: string[];
  colors: Color[];
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
        enabled: true,
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
    <div className=" w-full">
      <ReactApexChart
        type="donut"
        series={state.series}
        options={state.options}
        width="100%"
      />
    </div>
  );
}
export default PieChart;
