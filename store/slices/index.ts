import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from './loadingSlice';
import resultSlice from './resultSlice';
import todayTotalFRSlice from './chart/todayTotalFRSlice';

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  result: resultSlice.reducer,
  todayTotalFR: todayTotalFRSlice.reducer,
});

export default rootReducer;
