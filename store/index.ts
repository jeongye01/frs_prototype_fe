import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'store/sagas';
import rootReducer from 'store/slices';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({

 reducer: { rootReducer },
  middleware: [sagaMiddleware] as const;,
});

sagaMiddleware.run(rootSaga);


export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;
export default store;
