import { lazy } from 'react';
import { ModalIndex } from 'typeDefs/Modal';
export const modalName = {
  UserMgtModal: 'UserMgtModal',
};

const modalList: ModalIndex[] = [
  {
    name: 'UserMgtModal',
    component: lazy(() => import('components/Modal/UserMgtModal')),
  },
];

export default modalList;
