import type { Recipe } from '../../../types';

export default function RecipeItem({ recipe }: { recipe: Recipe }) {
  return (
    <div className='flex flex-col justify-between items-center p-2 hover:scale-102 transition-all duration-300 cursor-pointer  rounded-md backdrop-blur-2xl shadow-xl m-2 bg-white/30 w-full'>
      <h1 className='text-xl font-bold text-gray-500'>{recipe.name}</h1>
      <img
        width={100}
        height={100}
        src={recipe.image}
        alt={recipe.name}
      />
      <p className='italic'>{recipe.instructions[1]}</p>
      <div className='flex justify-evenly items-center'>
        <h3 className='text-md font-bold'>
          Rating: <span className='text-blue-800'>{recipe.rating}</span>
        </h3>
      </div>
      <div className='text-md font-bold w-full'>
        Meal Types:{' '}
        <span className='text-blue-800 grid grid-cols-3'>
          {recipe.mealType.map((meal, index) => (
            <ul
              key={index}
              className='flex flex-wrap'
            >
              <li className='text-gray-500 text-sm'>{meal}</li>
            </ul>
          ))}
        </span>
      </div>
      <h3 className='mt-6 text-md font-bold'>
        Difficulty:
        <span className='text-blue-800'>{recipe.difficulty}</span>
      </h3>
    </div>
  );
}
