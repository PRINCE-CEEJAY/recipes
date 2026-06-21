import { createSlice } from "@reduxjs/toolkit";

const initialFilters = {
  search: "",
  category: "",
  sort: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialFilters,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setSearch, setCategory, setSort } = filterSlice.actions;
export default filterSlice.reducer;
