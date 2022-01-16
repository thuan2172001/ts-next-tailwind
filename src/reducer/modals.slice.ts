/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
let id = 1;
const modalsSlice = createSlice({
  name: 'ui',
  initialState: [],
  reducers: {
    addModal(state: any[], action: any) {
      const tmp = Object.assign({}, { ...action.payload, id: id++ });
      state.push(tmp);
    },
    removeModal(state: any[], action: any): any {
      return state.filter((i: any) => i.id !== action.payload);
    },
  },
});

export const { addModal, removeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
