import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { pageCount, category, sortBy, order, searchValue } = params;
  const res = await axios.get(
    `https://629b64b3656cea05fc3883e0.mockapi.io/Items?&page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`,
  );
  return res.data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      console.log('ERROR');
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
