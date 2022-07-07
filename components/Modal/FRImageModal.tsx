import React from 'react';
import { useQuery } from 'react-query';
import { getHistoryFRImage1, getHistoryFRImage2 } from 'api/history';
import { useRouter } from 'next/router';

export default function UserAddModal() {
  const router = useRouter();
  const { data } = useQuery(['history', 'FRImage1'], () =>
    getHistoryFRImage1({ sn: +(router.query?.sn || 0) }),
  );

  return <div>사진 {router.query?.sn}</div>;
}
