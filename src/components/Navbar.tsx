import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedSearch } from '../hooks/useDebounceSearch';
import { setSearch } from '../app/features/recipes/filterSlice';

export default function Navbar() {
  const [searchInput, setSeearchInput] = useState('');
  const debouncedValue = useDebouncedSearch(searchInput);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearch(debouncedValue));
  }, [dispatch, debouncedValue]);

  return (
    <div className='w-full space-x-2 flex items-center justify-between fixed top-0 z-100 bg-white/30 backdrop-blur-xl shadow-md p-2'>
      {/* Logo & Name */}
      <section className='flex items-center'>
        <h1 className='fancy-text'>CEE-RECIPES</h1>
      </section>
      {/* Search */}
      <section>
        <input
          value={searchInput}
          onChange={(e) => setSeearchInput(e.target.value)}
          className='p-2 rounded-md italic w-sm border border-gray-500'
          placeholder='Search for Posts ...'
        />
      </section>
      {/* Auth */}
      <section className='flex items-center gap-2'>
        <User size={35} />
        Profile
      </section>
    </div>
  );
}
