import { configureStore } from '@reduxjs/toolkit';
import recipeSlice from './features/recipes/recipeSlice';
import filterSlice from './features/recipes/filterSlice';
import authSlice from './features/auth/AuthSlice';
import recipeApi from '../services/recipeApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
    auth: authSlice,
    recipes: recipeSlice,
    filters: filterSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
