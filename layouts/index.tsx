import React from 'react';

import Sidebar from 'components/Sidebar/Sidebar';

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div className=" flex ">
      <Sidebar />
      <div className="w-full  px-[70px] bg-[#f5f7fc]">{children}</div>
    </div>
  );
}
