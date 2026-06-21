import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RecipesResponse, Recipe } from '../types';

// Define the argument type for the query
type RecipesQueryParams = {
  mealType?: string;
};

// services/recipeApi.ts
export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipesResponse, RecipesQueryParams>({
      query: ({ mealType }) => {
        // Normalize: ensure lowercase and trim whitespace
        const type = mealType ? mealType.toLowerCase().trim() : '';

        // List of valid types to prevent 404s on typos or invalid data
        const validTypes = [
          'breakfast',
          'lunch',
          'dinner',
          'snack',
          'dessert',
          'appetizer',
        ];

        if (type && validTypes.includes(type)) {
          return `recipes/meal-type/${type}`;
        }
        // Fallback to all recipes if type is invalid or missing
        return 'recipes';
      },
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `recipes/${id}`,
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipeApi;

export default recipeApi;
