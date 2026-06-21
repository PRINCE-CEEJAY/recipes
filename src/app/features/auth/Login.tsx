import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../components/ui/alert';
import { login } from './AuthSlice';
import type { RootState } from '../../store';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    dispatch(
      login({
        name: email.split('@')[0],
        email,
      }),
    );

    navigate('/');
  };

  return (
    <div className='flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/50'>
        <CardHeader className='space-y-2 px-8 pt-8'>
          <CardTitle className='text-2xl'>Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue to your recipes dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className='px-8 pb-6 pt-3'>
          {error ? (
            <Alert
              variant='destructive'
              className='mb-4'
            >
              <AlertTitle>Unable to sign in</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <form
            className='space-y-4'
            onSubmit={handleSubmit}
          >
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                placeholder='you@example.com'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                autoComplete='current-password'
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                placeholder='Enter your password'
              />
            </div>

            <CardFooter className='flex flex-col gap-3 px-0 pt-4'>
              <Button
                type='submit'
                className='w-full'
              >
                Sign in
              </Button>
              <p className='text-center text-sm text-slate-600'>
                New here?{' '}
                <Link
                  to='/register'
                  className='font-medium text-sky-600 hover:text-sky-700'
                >
                  Create an account
                </Link>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
