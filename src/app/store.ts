import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./features/recipes/recipeSlice";
import filterSlice from "./features/recipes/filterSlice";
import recipeApi from "../services/recipeApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
    recipes: recipeSlice,
    filters: filterSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});

setupListeners(store.dispatch);
