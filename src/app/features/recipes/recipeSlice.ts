import { createSlice } from "@reduxjs/toolkit";
const initialRecipes = {
  recipes: {
    id: 1,
    name: "Indomie",
    ingredients: ["maggi", "oil", "water", "eggs", "carrots"],
    instructions: [
      "pour water in a pot",
      "put it on fire",
      "add eggs and carrots",
      "let it cook for 10 minutes",
      "drain water and serve",
    ],
  },
  limit: 0,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: initialRecipes,
  reducers: {
    recipeAdded: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export const { recipeAdded } = recipeSlice.actions;
export default recipeSlice.reducer;
