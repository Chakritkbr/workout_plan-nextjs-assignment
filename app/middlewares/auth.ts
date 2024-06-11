import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export async function authorizeMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
): Promise<void> {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    res
      .status(401)
      .json({
        success: false,
        message: 'Unauthorized: Access token not found',
      });
    return;
  }
  try {
    const decode = (await jwt.verify(
      accessToken,
      process.env.JWT_SECRET ?? 'some_dumb_secret'
    )) as JwtPayload;
    if (!decode) {
      res
        .status(401)
        .json({
          success: false,
          message: 'Unauthorized: Invalid access token',
        });
      return;
    }
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: 'Unauthorized: Invalid access token' });
  }
}
