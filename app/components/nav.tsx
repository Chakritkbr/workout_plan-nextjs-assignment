'use client';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { UserContext } from '../provider/context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
    } catch (error) {
      console.error('failed to log out', error);
    }
  };
  const handleItemClick = () => {
    setIsOpen(false);
  };
  return (
    <nav className='bg-primary p-4 flex justify-between items-center'>
      {/* Far Left */}
      <div>
        <span className='text-white text-lg font-semibold'>Workout Plan</span>
      </div>

      {/* Far Right */}
      <div className='flex items-center'>
        {/* name and Icon dropdown */}
        <p className='text-white px-4'>
          {user
            ? `Hi !!! ${user.email}`
            : 'Hi!!! People who are going to be in shape'}
        </p>
        <button onClick={() => setIsOpen(!isOpen)} className='dropdown '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>

          <i className={`fas ${isOpen ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
        </button>
        {/* Dropdown menu */}
        {isOpen && (
          <div className='dropdown-menu'>
            <ul className='py-2'>
              {user ? (
                <>
                  <li
                    className='text-center border-b py-1'
                    onClick={handleItemClick}
                  >
                    <Link href='/dashboard'>Dashboard</Link>
                  </li>
                  <li className='text-center py-1' onClick={handleItemClick}>
                    <Link href='/' onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className='text-center border-b py-1'
                    onClick={handleItemClick}
                  >
                    <Link href='/login'>Login</Link>
                  </li>
                  <li className='text-center py-1' onClick={handleItemClick}>
                    <Link href='/register'>Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
