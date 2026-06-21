import RecipeFilters from './app/features/recipes/RecipeFilters';
import RecipeList from './app/features/recipes/RecipeList';

export default function App() {
  return (
    <div className='flex flex-col jutify-center items-center mt-30'>
      <h1 className='fancy-text'>Recipes List</h1>
      <RecipeFilters />
      <RecipeList />
    </div>
  );
}
