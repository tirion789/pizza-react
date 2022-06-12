import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
  sortType: { name: 'популярности (DESC)', sort: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setSort(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const { setCategoryIndex, setSort } = filterSlice.actions;

export default filterSlice.reducer;
