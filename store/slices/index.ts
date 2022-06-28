import { combineReducers } from '@reduxjs/toolkit';
import historyFRSlice from './historyFRSlice';
import modalSlice from './modalSlice';
import userListSlice from './userListSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  historyFR: historyFRSlice.reducer,
  modal: modalSlice.reducer,
  userList: userListSlice.reducer,
  user: userSlice.reducer,
});

export default rootReducer;
