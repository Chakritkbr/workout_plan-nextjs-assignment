'use client';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { UserContext } from '../provider/context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // กำหนดข้อความทักทายตัวผู้ใช้
  const greetingText = user
    ? `Hi !!! ${user.email}`
    : 'Hi!!! People who are going to be in shape';

  // ฟังก์ชันสำหรับการออกจากระบบ
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('failed to log out', error);
    }
  };

  // ปิดเมนู dropdown เมื่อคลิกที่รายการเมนู
  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className='bg-primary p-4 flex justify-between items-center'>
      {/* ส่วนทางซ้าย */}
      <div>
        <span className='text-white text-lg font-semibold'>Workout Plan</span>
      </div>

      {/* ส่วนทางขวา */}
      <div className='flex items-center'>
        {/* ข้อความทักทายและปุ่ม dropdown */}
        <p className='text-white px-4'>{greetingText}</p>
        <button onClick={() => setIsOpen(!isOpen)} className='dropdown'>
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

        {/* เมนู dropdown */}
        {isOpen && (
          <div className='dropdown-menu'>
            <ul className='py-2'>
              {user ? (
                <>
                  <li
                    className='text-center border-b py-1'
                    onClick={handleItemClick}
                  >
                    <Link href={`/dashboard/${user.userId}`}>Dashboard</Link>
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
