import { Request, Response, NextFunction } from 'express';
import { validate as isUuid } from 'uuid';
import { findOrCreateUser } from '../services/userService';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userId = req.cookies.user_id;

  if (userId && !isUuid(userId)) {
    userId = null;
  }

  const user = await findOrCreateUser(userId);

  if (!userId) {
    res.cookie('user_id', user.user_id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  }

  req.user = user;
  next();
};
