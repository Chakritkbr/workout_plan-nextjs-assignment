'use client';
import axios from 'axios';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // Check password length
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      const { data } = await axios.post('/api/register', { email, password });
      alert('Register Successful');
      window.location.href = '/login';
    } catch (error) {
      alert('Register failed');
    }
  }

  return (
    <div className='container'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto ' onSubmit={handleRegister}>
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
            Register
          </button>

          <div className='text-center py-2 text-gray-500'>
            Already a member?{' '}
            <Link className='underline hover:text-black' href={'/login'}>
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
