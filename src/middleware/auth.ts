import {Request, Response, NextFunction, response} from 'express';
import {v4 as uuidv4 } from 'uuid';
import { createUser, getUserById } from '../repositories/userRepository';
import { User } from '../types';

export const authMiddlewer =  async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.cookies.user_id;
    if (!userId) {
        const newUserId = uuidv4();
        const now = new Date().toISOString();

        const newUser : User = {
            user_id: newUserId,
            base_currency: 'USD',
            favorites: [],
            created_at: now,
            updated_at: now,
        };

        await createUser(newUser);

        res.cookie('user_id',
            newUserId, {
                httpOnly: true,
                maxAge: 365* 24 * 60 *60 * 1000,
        });

        (req as any).user = newUser;
    } else {
        const user = await getUserById(userId);

        if (!user) {
        const now = new Date().toISOString();

        const newUser : User = {
            user_id: userId,
            base_currency: 'USD',
            favorites: [],
            created_at: now,
            updated_at: now,
        };

        await createUser(newUser);
        (req as any).user = newUser
    } else {
        (req as any).user = user;
    }
    };
next();}
