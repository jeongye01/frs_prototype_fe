import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import React, { ChangeEvent, useEffect, useReducer } from 'react';

import { AxiosError } from 'axios';
import { TodayFRType } from 'typeDefs/Chart';
import { useQuery } from 'react-query';
import { getHistoryFRImage1, getHistoryFRImage2 } from 'api/history';
import { useRouter } from 'next/router';

export default function UserAddModal() {
  const [_, closeFRImageModal] = useModal();
  const router = useRouter();
  const { data, isLoading, isFetching, refetch } = useQuery(
    ['history', 'FRImage1'],
    () => getHistoryFRImage1({ sn: +(router.query?.sn || 0) }),
  );

  return <div>사진 {router.query?.sn}</div>;
}
