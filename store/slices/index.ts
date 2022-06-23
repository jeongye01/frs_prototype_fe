import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from './loadingSlice';
import resultSlice from './resultSlice';
import historyFRSlice from './historyFRSlice';
import modalSlice from './modalSlice';
import userListSlice from './userListSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  result: resultSlice.reducer,
  historyFR: historyFRSlice.reducer,
  modal: modalSlice.reducer,
  userList: userListSlice.reducer,
  user: userSlice.reducer,
});

export default rootReducer;
