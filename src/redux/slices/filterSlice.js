import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
  pageCount: 1,
  searchValue: '',
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
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryIndex, setSort, setPageCount, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
