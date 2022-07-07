import React from 'react';
import Sidebar from 'components/Sidebar';

import Header from 'components/Header';

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div>
      <Sidebar />
      <div className="md:ml-64">
        <div className="bg-light-blue-500 px-3 md:px-8 h-80 fixed  w-full " />
        {children}
      </div>
    </div>
  );
}
