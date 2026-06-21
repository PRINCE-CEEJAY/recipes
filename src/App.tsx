import { type ReactNode } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import Navbar from './components/Navbar';
import RecipeFilters from './app/features/recipes/RecipeFilters';
import RecipeList from './app/features/recipes/RecipeList';
import Login from './app/features/auth/Login';
import Register from './app/features/auth/Register';

function HomePage() {
  return (
    <div className='mx-auto mt-28 max-w-6xl px-4 pb-12 sm:px-6 lg:px-8'>
      <section className='mb-8 rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-lg shadow-slate-200/40 backdrop-blur-xl'>
        <div className='max-w-3xl'>
          <p className='mb-3 text-sm uppercase tracking-[0.3em] text-sky-600'>
            Modern recipes
          </p>
          <h1 className='mb-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl'>
            Discover easy recipes, organize your pantry, and cook with
            confidence.
          </h1>
          <p className='text-base leading-7 text-slate-600'>
            Browse, filter, and save the recipes you love. Sign in to
            personalize your experience and keep your favorites handy.
          </p>
        </div>
      </section>

      <RecipeFilters />
      <RecipeList />
    </div>
  );
}

function RequireAuth({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to='/login'
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-slate-50 text-slate-900'>
        <Navbar />
        <main className='pt-24'>
          <Routes>
            <Route
              path='/'
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='*'
              element={
                <Navigate
                  to='/'
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
