'use client';
import axios from 'axios';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/api/login', { email, password });
      alert('Login Successful');
    } catch (error) {
      alert('Login failed');
    }
  }
  return (
    <div className='container'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto ' onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='your@email.com'
            value={email}
            className='input-email'
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            className='input-password'
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type='submit' className='primary '>
            Login
          </button>

          <div className='text-center py-2 text-gray-500'>
            Dont have an account yet?{' '}
            <Link className='underline hover:text-black' href={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
