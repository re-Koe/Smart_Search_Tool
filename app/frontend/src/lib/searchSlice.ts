import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBedrooms: "",
  selectedBathrooms: "",
  hasAc: "",
  hasBasement: "",
  sortByPrice: "",
  sqft: "",
  price: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSelectedBedrooms: (state, action) => {
      state.selectedBedrooms = action.payload;
    },
    setSelectedBathrooms: (state, action) => {
      state.selectedBathrooms = action.payload;
    },
    setHasAc: (state, action) => {
      state.hasAc = action.payload;
    },
    setHasBasement: (state, action) => {
      state.hasBasement = action.payload;
    },
    setSqft: (state, action) => {
      state.sqft = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const {
  setSelectedBedrooms,
  setSelectedBathrooms,
  setHasAc,
  setHasBasement,
  setPrice,
  setSqft,
} = searchSlice.actions;

export default searchSlice.reducer;
