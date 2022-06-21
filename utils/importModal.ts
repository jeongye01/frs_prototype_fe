import { lazy } from 'react';
import { ModalIndex } from 'typeDefs/Modal';
export const modalName = {
  UserAddModal: 'UserAddModal',
  UserEditModal: 'UserEditModal',
};

const modalList: ModalIndex[] = [
  {
    name: modalName.UserAddModal,
    component: lazy(() => import('components/Modal/User/UserAddModal')),
  },
  {
    name: modalName.UserEditModal,
    component: lazy(() => import('components/Modal/User/UserEditModal')),
  },
];

export default modalList;
