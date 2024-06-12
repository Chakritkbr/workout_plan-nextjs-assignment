import { cookies } from 'next/headers';
import dbConnect from '@/app/DB/connectDB';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateData } from '../utils/validation';

export async function POST(req: Request, res: Response) {
  await dbConnect();

  const { email, password } = await req.json();

  // Validate data (already implemented)
  const { error } = validateData({ email, password });
  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.details.map((detail: any) => detail.message).join(', '),
      },
      { status: 400 }
    );
  }

  try {
    // Check user in DB
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password' },
        { status: 409 }
      );
    }

    // Sign token with userId and email
    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email },
      process.env.JWT_SECRET || 'somes_dumb_secret',
      { expiresIn: '1h' }
    );

    // Set cookie (already implemented)
    cookies().set('accessToken', token, {
      maxAge: 300,
      httpOnly: true,
      secure: false, // Adjust based on your security requirements
    });

    // Return successful response with userId and email
    return NextResponse.json(
      {
        success: true,
        message: 'User Login Successful',
        accessToken: token,
        user: {
          userId: checkUser._id, // Include userId in the response
          email: checkUser.email, // Include email in the response
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error in Login (server) => ', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something Went Wrong Please Retry Later !',
      },
      { status: 500 }
    );
  }
}
