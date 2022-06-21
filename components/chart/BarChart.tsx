import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  data: number[];
  colors: string[];
  categories: string[];
}

function BarChart({ data, colors, categories }: Props) {
  const state = {
    series: [
      {
        data,
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

      dataLabels: {
        enabled: true,
        position: 'top',
        offsetY: -30,

        style: {
          fontSize: '16px',
          colors, // *
        },
      },

      xaxis: {
        categories, // *
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
        colors, // *
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
      {data?.length === colors?.length &&
        colors?.length === categories?.length && (
          <div className="w-full">
            <ReactApexChart
              type="bar"
              series={state.series}
              options={state.options}
              width="100%"
            />
          </div>
        )}
    </>
  );
}
export default BarChart;
