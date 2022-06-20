import React from 'react';
import Sidebar from 'components/Sidebar/Sidebar';
import Modal from 'components/Modal';

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div className="main mx-auto  flex ">
      <Sidebar />
      <div className="w-full  px-[70px] bg-[#f5f7fc]">{children}</div>
      <Modal />
    </div>
  );
}
