// resultsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResultsState {
  data: any[];
  isLoading: boolean;
}

const initialState: ResultsState = {
  data: [],
  isLoading: false,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setResults, setLoading } = resultsSlice.actions;
export default resultsSlice.reducer;
