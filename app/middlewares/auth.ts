import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function authorizeMiddleware(req: NextRequest) {
  try {
    const cookies = req.cookies as any;
    const accessToken = cookies._parsed.get('accessToken').value; // เข้าถึงค่าของ accessToken ผ่านฟิลด์ value
    // console.log(accessToken);
    if (!accessToken) {
      // throw new Error('Unauthorized: Access token not found');
      return false;
    }
    const decode = (await jwt.verify(
      accessToken,
      process.env.JWT_SECRET ?? 'some_dumb_secret'
    )) as JwtPayload;
    console.log(decode);

    if (decode) {
      console.log('pass');
    }
    return true;
  } catch (error) {
    console.error('Error verifying access token:', error);
    return false;
  }
}
