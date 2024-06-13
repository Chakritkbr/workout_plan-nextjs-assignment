import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// Adjust the interface FormData to match the expected JSON structure
interface FormData {
  planName: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  weeklyActivities: number[]; // Adjusted to number array as per example
  newActivity: string;
  workoutGoal: string;
  workoutPlan: string;
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    // Assuming the incoming data is sent as JSON
    const {
      planName,
      dateOfBirth,
      height,
      weight,
      weeklyActivities,
      newActivity,
      workoutGoal,
      workoutPlan,
    } = await req.json();

    // Create your business logic or data processing here (not shown in example)

    // Construct the response object based on the adjusted interface
    const response = {
      success: true,
      message: 'Plan created successfully',
      data: {
        planName,
        dateOfBirth,
        height,
        weight,
        weeklyActivities,
        newActivity,
        workoutGoal,
        workoutPlan,
      },
    };

    // Send the JSON response with status 201 (Created) and include the created data
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error in POST request:', error);
    // If there's an error, send a generic error response with status 500 (Internal Server Error)
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}
