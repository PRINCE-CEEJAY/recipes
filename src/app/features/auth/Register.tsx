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
import { register } from './AuthSlice';
import type { RootState } from '../../store';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !email || !password || !confirmPassword) {
      setError('All fields are required.');
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

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    dispatch(register({ name: name.trim(), email }));
    navigate('/');
  };

  return (
    <div className='flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/50'>
        <CardHeader className='space-y-2 px-8 pt-8'>
          <CardTitle className='text-2xl'>Create your account</CardTitle>
          <CardDescription>
            Register to save your favorite recipes and personalize your
            experience.
          </CardDescription>
        </CardHeader>
        <CardContent className='px-8 pb-6 pt-3'>
          {error ? (
            <Alert
              variant='destructive'
              className='mb-4'
            >
              <AlertTitle>Registration failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <form
            className='space-y-4'
            onSubmit={handleSubmit}
          >
            <div className='grid gap-2'>
              <Label htmlFor='name'>Full name</Label>
              <Input
                id='name'
                type='text'
                autoComplete='name'
                value={name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                placeholder='Jane Doe'
              />
            </div>

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
                autoComplete='new-password'
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                placeholder='Create a password'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Confirm password</Label>
              <Input
                id='confirmPassword'
                type='password'
                autoComplete='new-password'
                value={confirmPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder='Repeat your password'
              />
            </div>

            <CardFooter className='flex flex-col gap-3 px-0 pt-4'>
              <Button
                type='submit'
                className='w-full'
              >
                Create account
              </Button>
              <p className='text-center text-sm text-slate-600'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-sky-600 hover:text-sky-700'
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
