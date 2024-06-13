'use client';
// Import libraries and components
import { UserContext } from '@/app/provider/context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useContext(UserContext);
  const [plan, setPlan] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchUserPlan = async () => {
        try {
          const response = await axios.get(`/api/workplan/${user.userId}`);
          if (response.status !== 200) {
            throw new Error('Failed to fetch user plan');
          }
          setPlan(response.data.data);
        } catch (error) {
          console.error('Error fetching user plan:', error);
        }
      };

      fetchUserPlan();
    }
  }, [user]);
  const formatDateOfBirth = (dateOfBirth: string) => {
    const date = new Date(dateOfBirth);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  const latestPlan = plan.length > 0 ? plan[plan.length - 1] : null;

  return (
    <div className='mx-auto mt-8 px-4'>
      <div className='text-4xl text-center mb-4'>Hi {user?.email}</div>

      <div className='flex flex-wrap justify-center'>
        {/* Left side */}
        <div className='w-full md:w-1/2 px-5'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>User Plans:</h2>
            {plan.length > 0 ? (
              <div>
                {plan.map((item, index) => (
                  <div key={index} className='mb-4'>
                    <p className='text-lg'>
                      <span className='font-bold'>Plan Name:</span>{' '}
                      {item.planName}
                    </p>

                    <p>
                      <span className='font-bold'>Weekly Activities:</span>{' '}
                      {item.weeklyActivities.join(', ')}
                    </p>
                    <p className='text-lg'>
                      <span className='font-bold'>Workout Goal:</span>{' '}
                      {item.workoutGoal}
                    </p>
                    <p className='text-lg'>
                      <span className='font-bold'>Workout Plan:</span>{' '}
                      {item.workoutPlan}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex items-center'>
                <p className='text-lg'>
                  It seems like you have no plan yet, try to make one?
                </p>
                <Link href='/form'>
                  <span className='underline hover:text-black ml-1'>
                    Make a Plan
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right side (Personal Data section) */}
        <div className='w-full md:w-1/2 px-5'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Personal Data:</h2>
            {latestPlan ? (
              <div className=' items-center justify-center'>
                <p>
                  <span className='font-bold'>Date of Birth:</span>{' '}
                  {formatDateOfBirth(latestPlan.dateOfBirth)}
                </p>
                <p>
                  <span className='font-bold'>Height:</span> {latestPlan.height}{' '}
                  cm
                </p>
                <p>
                  <span className='font-bold'>Weight:</span> {latestPlan.weight}{' '}
                  kg
                </p>
                <p>
                  <span className='font-bold'>Weekly Activities:</span>{' '}
                  {latestPlan.weeklyActivities.join(', ')} kg
                </p>
              </div>
            ) : (
              <p className='text-lg'>No personal data available.</p>
            )}
          </div>
          <Link href={`/form/${user?.userId}`}>
            <button className='formBtnGen'>Make a Plan</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
