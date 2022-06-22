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
      <div className=" w-[250px]  min-w-[250px] h-screen  top-0 bottom-0 left-0 overflow-y-auto py-4 px-3 bg-[#3b75e3]" />
      <div className="w-full  h-full  px-[70px] bg-[#f5f7fc] overflow-y-scroll">
        {children}
      </div>
      <Modal />
    </div>
  );
}
