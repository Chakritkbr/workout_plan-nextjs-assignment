import dbConnect from '@/app/DB/connectDB';
import { authorizeMiddleware } from '@/app/middlewares/auth';
import PersonalInfo, { IPersonalInfo } from '@/app/models/PersonalInfo';
import User from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const userId = params.slug;
  try {
    await dbConnect();
    const isAuthenticated = await authorizeMiddleware(req);
    if (!isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized: Access token invalid or expired',
        },
        { status: 401 }
      );
    }
    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const {
      planName,
      dateOfBirth,
      height,
      weight,
      weeklyActivities,
      workoutGoal,
      workoutPlan,
    } = await req.json();
    console.log(
      planName,
      dateOfBirth,
      height,
      weight,
      weeklyActivities,
      workoutGoal,
      workoutPlan
    );

    const newPersonalInfo: IPersonalInfo = new PersonalInfo({
      userId,
      planName,
      dateOfBirth,
      height,
      weight,
      weeklyActivities,
      workoutGoal,
      workoutPlan,
    });
    await newPersonalInfo.save();
    return NextResponse.json(
      {
        success: true,
        message: 'PersonalInfo created successfully 555',
        data: newPersonalInfo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating PersonalInfo:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
