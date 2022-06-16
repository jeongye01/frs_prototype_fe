import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from './loadingSlice';
import resultSlice from './resultSlice';
import todayTotalFRSlice from './chart/todayTotalFRSlice';
import historyDailyFRSlice from './chart/historyDailyFRSlice';
import historyFRSlice from './historyFRSlice';

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  result: resultSlice.reducer,
  todayTotalFR: todayTotalFRSlice.reducer,
  historyDailyFR: historyDailyFRSlice.reducer,
  historyFR: historyFRSlice.reducer,
});

export default rootReducer;
