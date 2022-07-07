import BarChart from 'components/Chart/BarChart';
import PieChart from 'components/Chart/PieChart';
import { AxiosError } from 'axios';
import { TodayFRType } from 'typeDefs/Chart';
import { useQuery } from 'react-query';
import { getTodayTotalFR, GetTodayFRResponse } from 'api/chart';
import ChartLayout from './Layout';
function TodayTotalFRChart() {
  const { data, isFetching, refetch } = useQuery<
    GetTodayFRResponse,
    AxiosError,
    TodayFRType
  >(['chart', 'todayTotalFR'], getTodayTotalFR, {
    select: data => data.data,

    // refetchInterval: 30000, //30초 마다 데이터 refetch
  });

  return (
    <ChartLayout
      headerColor="pink"
      onRefreshClick={refetch}
      title="금일 얼굴인증"
    >
      {data && (
        <>
          {!isFetching && (
            <>
              <div className="flex items-center w-full h-full ">
                <div className="flex w-2/5 h-full items-center ">
                  <PieChart
                    data={[50, 50]}
                    colors={['#26A0FC', '#26E7A6']}
                    labels={['인증 성공률', '인증 실패률']}
                  />
                </div>
                <div className="flex w-3/5 h-full items-center">
                  <BarChart
                    data={[66, 33, 33]}
                    categories={['인증 요청', '인증 성공', '인증 실패']}
                    colors={['#FEBC3B', '#26A0FC', '#26E7A6']}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </ChartLayout>
  );
}

export default TodayTotalFRChart;
