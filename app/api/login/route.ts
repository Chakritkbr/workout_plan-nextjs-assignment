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
    //check User in db
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    //compare password
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password' },
        { status: 409 }
      );
    }
    //sign token
    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email },
      process.env.JWT_SECREAT || 'somes_dumb_secret',
      { expiresIn: '1h' }
    );
    // Set cookie
    cookies().set('accessToken', token, {
      maxAge: 300,
      httpOnly: true,
      secure: false,
    });
    // console.log(token);
    return NextResponse.json(
      {
        success: true,
        message: 'User Login Successfull',
        accessToken: token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error in register (server) => ', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something Went Wrong Please Retry Later !',
      },
      { status: 500 }
    );
  }
}
