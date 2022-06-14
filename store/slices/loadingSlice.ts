import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  loading: any; //Generic으로 고치기
}

const initialState: InitialState = {
  loading: {},
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, { payload: actionType }: PayloadAction<string>) => {
      state.loading[actionType] = true;
    },
    finishLoading: (state, { payload: actionType }: PayloadAction<string>) => {
      state.loading[actionType] = false;
    },
  },
});

export default loadingSlice;
