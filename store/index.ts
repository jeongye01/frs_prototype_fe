import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'store/sagas';
import rootReducer from 'store/slices/rootReducer'

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {},
  middleware: [sagaMiddleware] as const;,
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
