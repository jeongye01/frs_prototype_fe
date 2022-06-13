/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Modal from 'components/Modal';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface TemplateProps {
  children: React.ReactNode;
  // Modal?: React.ReactNode;
}

export default function BaseTemplate({ children }: TemplateProps) {
  const { isOpenModal } = useSelector((state: RootState) => state.modal);

  return (
    <div className="main pc:max-w-[1200px] mx-auto ">
      {children}
      {isOpenModal && <Modal />}
    </div>
  );
}
