import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'store/sagas';
import rootReducer from 'store/slices';

export const store = configureStore({
  reducer: { rootReducer },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
