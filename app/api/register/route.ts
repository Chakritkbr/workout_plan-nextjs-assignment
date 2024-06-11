import { NextResponse } from 'next/server';
import dbConnect from '@/app/DB/connectDB';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validation';

// export async function GET(req: Request, res: Response) {
//   const data = {
//     text: 'hello JOJO',
//   };
//   return NextResponse.json(data);
// }

export async function POST(req: Request) {
  await dbConnect();

  const { email, password } = await req.json();

  //validate
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
    const ifExist = await User.findOne({ email });
    if (ifExist) {
      return NextResponse.json(
        {
          success: false,
          message: 'User Already Exist',
        },
        { status: 409 } // Conflict
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const createUser = await User.create({ email, password: hashedPassword });
      if (createUser)
        return NextResponse.json(
          {
            success: true,
            message: 'Account created successfully',
          },
          { status: 201 } // Created
        );
    }
  } catch (error) {
    console.log('Error in register (server) => ', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something Went Wrong Please Retry Later !',
      },
      { status: 500 } // Internal Server Error
    );
  }
}
