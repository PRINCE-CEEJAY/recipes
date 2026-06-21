import RecipeItem from './RecipeItem';
import { useGetRecipesQuery } from '../../../services/recipeApi';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
export default function Posts() {
  const { search, category } = useSelector((state) => state.filters);
  const { data: response } = useGetRecipesQuery({ mealType: category });

  const minColumnWidth = '200px';

  const filtered = useMemo(() => {
    return (
      response?.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase()),
      ) ?? []
    );
  }, [response?.recipes, search]);

  return (
    <div
      className={`grid grid-cols-[repeat(auto-fit,minmax(${minColumnWidth},1fr))] gap-2 text-center w-full`}
    >
      {response ? (
        filtered.map((recipe) => (
          <RecipeItem
            recipe={recipe}
            key={recipe.id}
          />
        ))
      ) : (
        <h1 className='text-xl font-bold text-center'>Loaading</h1>
      )}
    </div>
  );
}
