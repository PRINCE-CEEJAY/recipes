import { useDispatch } from 'react-redux';
import { setCategory } from './filterSlice';
import { useEffect, useState } from 'react';

export default function RecipeFilters() {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory(selected.toLowerCase()));
  }, [selected, dispatch]);

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className='p-2 rounded-lg border-2 border-gray-500 font-bold w-sm cursor-pointer'
    >
      <option value=''>All</option>
      <option value='Dinner'>Dinner</option>
      <option value='Lunch'>Lunch</option>
      <option value='Snack'>Snack</option>
      <option value='Dessert'>Dessert</option>
      <option value='Appetizer'>Appetizer</option>
    </select>
  );
}
