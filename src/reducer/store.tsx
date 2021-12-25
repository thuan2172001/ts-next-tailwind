/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
const data = createSlice({
  name: 'data',
  initialState: {
    userInfo: null,
  },
  reducers: {
    setData: (state: any, action) => {
      for (const i in action.payload) {
        state[i] = action.payload[i];
      }
    },
  },
});
export default configureStore({
  reducer: {
    data: data.reducer,
  },
});

export const { setData } = data.actions;
