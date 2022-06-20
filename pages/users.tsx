import type { NextPage } from 'next';
import { useEffect, useReducer } from 'react';

import { useAppSelector, useAppDispatch } from 'hooks/redux';
import Table from 'components/Table';
import Search from 'components/Search';
import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';
import User from 'components/User';

const History: NextPage = () => {
  const [openUserMgtModal] = useModal();
  return (
    <div className=" px-4 flex flex-col   items-start  mt-12 bg-[#f5f7fc] ">
      <button
        onClick={() => openUserMgtModal({ name: modalName.UserMgtModal })}
      >
        추가
      </button>
      <div className="mb-10" />
      <User />
    </div>
  );
};

export default History;
