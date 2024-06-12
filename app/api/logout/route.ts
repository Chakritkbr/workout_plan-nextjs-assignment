import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    // Clear cookie
    cookies().set('accessToken', '', { maxAge: -1 });

    return NextResponse.json(
      {
        success: true,
        message: 'User Logout Successfull',
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error in logout (server) => ', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something Went Wrong Please Retry Later !',
      },
      { status: 500 }
    );
  }
}
