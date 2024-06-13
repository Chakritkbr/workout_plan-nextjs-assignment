import dbConnect from '@/app/DB/connectDB';
import { authorizeMiddleware } from '@/app/middlewares/auth';
import PersonalInfo from '@/app/models/PersonalInfo';
import User from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';

interface PersonalInfoData {
  planName: string;
  dateOfBirth: string;
  height: number;
  weight: number;
  weeklyActivities: string[];
  workoutGoal: string;
  workoutPlan: string;
}

export async function GET(
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

    const personalInfos = await PersonalInfo.find({ userId: userId });
    if (personalInfos.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No PersonalInfo found for this user' },
        { status: 404 }
      );
    }
    const formattedPersonalInfos: PersonalInfoData[] = personalInfos.map(
      (info) => ({
        planId: info._id,
        planName: info.planName,
        dateOfBirth: info.dateOfBirth.toISOString(),
        height: info.height,
        weight: info.weight,
        weeklyActivities: info.weeklyActivities,
        workoutGoal: info.workoutGoal,
        workoutPlan: info.workoutPlan,
      })
    );

    return NextResponse.json(
      { success: true, data: formattedPersonalInfos },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching PersonalInfo:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
