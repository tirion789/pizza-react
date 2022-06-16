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
    setFilters(state, action) {
      state.pageCount = Number(action.payload.pageCount);
      state.sortType = action.payload.sorts;
      state.categoryIndex = Number(action.payload.categoryIndex);
    },
  },
});

export const { setCategoryIndex, setSort, setPageCount, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
