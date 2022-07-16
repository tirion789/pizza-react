import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortType = {
   name: string;
   sort: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price' 
}

interface FilterSliceState {
  categoryIndex: number,
  pageCount: number,
  searchValue: string,
  sortType: SortType,
}

const initialState: FilterSliceState = {
  categoryIndex: 0,
  pageCount: 1,
  searchValue: '',
  sortType: { 
    name: 'популярности (DESC)',
    sort: 'rating' 
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryIndex(state, action: PayloadAction<number>) {
      state.categoryIndex = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.pageCount = Number(action.payload.pageCount);
      state.sortType = action.payload.sorts;
      state.categoryIndex = Number(action.payload.categoryIndex);
    },
  },
});

export const { setCategoryIndex, setSort, setPageCount, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
