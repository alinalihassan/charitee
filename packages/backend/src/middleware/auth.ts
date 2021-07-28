import {Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
import {jwtVerify} from 'jose/jwt/verify';
import {secretKey} from '../util/config';

import Request from '../types/Request';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({msg: 'No token, authorization denied'});
  }
  // Verify token
  try {
    const {payload} = await jwtVerify(token, secretKey, {
      issuer: process.env.APP_NAME,
    });
    req.userId = payload.userId as string;
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Token is not valid'});
  }
}
