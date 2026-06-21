import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedSearch } from '../hooks/useDebounceSearch';
import { setSearch } from '../app/features/recipes/filterSlice';
import { logout } from '../app/features/auth/AuthSlice';
import type { RootState } from '../app/store';
import { Button } from './ui/button';

export default function Navbar() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedValue = useDebouncedSearch(searchInput);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(setSearch(debouncedValue));
  }, [dispatch, debouncedValue]);

  return (
    <div className='w-full fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-sm'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8'>
        <section className='flex items-center gap-3'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900'
          >
            <User size={24} />
            CEE-RECIPES
          </Link>
        </section>

        <section className='flex flex-1 min-w-0 items-center justify-center'>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='min-w-0 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200'
            placeholder='Search recipes...'
          />
        </section>

        <section className='flex items-center gap-2'>
          {user ? (
            <>
              <div className='flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm text-slate-700'>
                <User size={16} />
                <span>Welcome, {user.name}</span>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => dispatch(logout())}
                className='whitespace-nowrap'
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='rounded-2xl border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700'
              >
                Register
              </Link>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
