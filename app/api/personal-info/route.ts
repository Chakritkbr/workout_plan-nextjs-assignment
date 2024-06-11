import dbConnect from '@/app/DB/connectDB';
import PersonalInfo, { IPersonalInfo } from '@/app/models/PersonalInfo';
import { NextRequest, NextResponse } from 'next/server';
import { authorizeMiddleware } from '@/app/middlewares/auth';

export async function POST(req: NextRequest) {
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
    const { userId, planName, dateOfBirth, height, weight, weeklyActivities } =
      await req.json();
    // Create a new PersonalInfo instance
    const newPersonalInfo: IPersonalInfo = new PersonalInfo({
      userId,
      planName,
      dateOfBirth,
      height,
      weight,
      weeklyActivities,
    });
    await newPersonalInfo.save();
    return NextResponse.json(
      {
        success: true,
        message: 'PersonalInfo created successfully',
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
