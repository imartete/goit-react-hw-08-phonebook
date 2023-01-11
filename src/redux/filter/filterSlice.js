import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    getFilter(state, action) {
      state.value = action.payload;
    },
  },
});

export const { getFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
