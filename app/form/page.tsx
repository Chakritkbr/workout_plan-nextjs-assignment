'use client';
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';

interface FormData {
  planName: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  weeklyActivities: string[];
  newActivity: string;
  workoutGoal: string;
  workoutPlan: string;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    planName: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    weeklyActivities: [],
    newActivity: '',
    workoutGoal: '',
    workoutPlan: 'adasdasdasdasdasdasdasdas',
  });

  const [showForm2, setShowForm2] = useState<boolean>(false);
  const [showForm3, setShowForm3] = useState<boolean>(false);
  const [form1Valid, setForm1Valid] = useState<boolean>(false);

  const form2Ref = useRef<HTMLDivElement>(null);
  const form3Ref = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddWeeklyActivity = (): void => {
    if (formData.newActivity.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        weeklyActivities: [...prevData.weeklyActivities, prevData.newActivity],
        newActivity: '',
      }));
    }
  };

  const handleRemoveWeeklyActivity = (index: number): void => {
    const newWeeklyActivities = [...formData.weeklyActivities];
    newWeeklyActivities.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      weeklyActivities: newWeeklyActivities,
    }));
  };

  const handlecheckForm1 = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Validate Form 1
    if (
      formData.planName.trim() !== '' &&
      formData.dateOfBirth.trim() !== '' &&
      formData.height.trim() !== '' &&
      formData.weight.trim() !== ''
    ) {
      setForm1Valid(true);
      setShowForm2(true); // Open Form 2
    } else {
      setForm1Valid(false);
      alert('Please fill out all fields in Form 1.');
    }
  };

  const handleSetWorkoutGoal = (goal: string) => {
    setFormData((prevData) => ({
      ...prevData,
      workoutGoal: goal,
    }));
    setShowForm3(true); // Show Form 3 when workoutGoal is set
  };
  const handleSaveForm3 = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/form', formData); // Update API endpoint to match your backend
      console.log('Server response:', response.data);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  useEffect(() => {
    if (showForm2 && form2Ref.current) {
      form2Ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (showForm3 && form3Ref.current) {
      form3Ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showForm2, showForm3]);

  return (
    <div className='mt-8 flex justify-center'>
      <div className=''>
        <h1 className='text-4xl text-center mb-4'>Dashboard</h1>
        <form className='max-w-md mx-auto ' onSubmit={handlecheckForm1}>
          {/* Form 1: Personal Information */}
          <div>
            <h2 className='text-xl mb-4'>Form 1: Personal Information</h2>
            <label>
              Plan Name:
              <input
                type='text'
                name='planName'
                value={formData.planName}
                onChange={handleChange}
                required
                className='input-email'
              />
            </label>
            <label>
              Date of Birth:
              <input
                type='date'
                name='dateOfBirth'
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className='input-email'
              />
            </label>
            <label>
              Height (cm):
              <input
                type='number'
                name='height'
                value={formData.height}
                onChange={handleChange}
                required
                className='input-email'
              />
            </label>
            <label>
              Weight (kg):
              <input
                type='number'
                name='weight'
                value={formData.weight}
                onChange={handleChange}
                required
                className='input-email'
              />
            </label>
            Weekly Activity :
            <div className='max-h-24 overflow-y-auto mb-4 border p-2 rounded-xl'>
              {formData.weeklyActivities.map((activity, index) => (
                <div key={index}>
                  <label>
                    {activity}:
                    <button
                      type='button'
                      onClick={() => handleRemoveWeeklyActivity(index)}
                    >
                      Remove
                    </button>
                  </label>
                </div>
              ))}
            </div>
            <input
              type='text'
              value={formData.newActivity}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  newActivity: e.target.value,
                }))
              }
              className='input-email'
            />
            <button
              className='formBtnNext'
              type='button'
              onClick={handleAddWeeklyActivity}
            >
              Add Weekly Activity
            </button>
          </div>

          {/* Submit button for Form 1 */}
          <button className='formBtn' type='submit'>
            Next
          </button>
        </form>

        {/* Form 2: Workout Goal */}
        <div className='mt-8 '>
          {showForm2 && (
            <div ref={form2Ref}>
              <h2 className='text-xl mb-4'>Form 2: Workout Goal</h2>
              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  className='goals'
                  onClick={() => handleSetWorkoutGoal('Workout Goal 1')}
                >
                  <div className=''>Workout Goal 1</div>
                </button>
                <button
                  type='button'
                  className='goals'
                  onClick={() => handleSetWorkoutGoal('Workout Goal 2')}
                >
                  <div className=''>Workout Goal 2</div>
                </button>
                <button
                  type='button'
                  className='goals'
                  onClick={() => handleSetWorkoutGoal('Workout Goal 3')}
                >
                  <div className=''>Workout Goal 3</div>
                </button>
                <button
                  type='button'
                  className='goals'
                  onClick={() => handleSetWorkoutGoal('Workout Goal 4')}
                >
                  <div className=''>Workout Goal 4</div>
                </button>
                <button
                  type='button'
                  className='goals'
                  onClick={() => handleSetWorkoutGoal('Workout Goal 5')}
                >
                  <div className=''>Workout Goal 5</div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Form 3: Save or Regenerate Workout Planning */}
        <div ref={form3Ref} className='mt-8 mb-5'>
          {showForm3 && (
            <form onSubmit={handleSaveForm3}>
              <h2 className='text-xl mb-4'>Form 3: Your Weekly Workout Plan</h2>
              <p>{formData.workoutPlan}</p>
              <button className='formBtnGen' type='button'>
                Generate
              </button>
              <button className='formBtnSave' type='submit'>
                Save Plan
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
