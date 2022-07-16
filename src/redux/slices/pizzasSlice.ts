import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type FetchPizzaSlice = {
  pageCount: string;
  category: string;
  sortBy: string;
  order: string;
  searchValue: string
}


type PizzaItem = {
  id: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaSlice>('pizza/fetchPizzasStatus',
 async (params) => {
  const { pageCount, category, sortBy, order, searchValue } = params;
    const {data} = await axios.get<PizzaItem[]>(
      `https://629b64b3656cea05fc3883e0.mockapi.io/Items?&page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`,
    );
    return data as PizzaItem[];
    });

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  items: PizzaItem[]; 
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING
        state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });   
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
})
  }
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
