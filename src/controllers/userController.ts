import { Request, Response } from "express";
import {updateUser as updateUserInDb} from '../repositories/userRepository';


export const getUser = (req: Request, res: Response) => {
    const user = (req as any).user;
    res.json(user);
};

export const updateUser = async (req: Request, res: Response)=> {
    const user = (req as any).user;
    const {base_currency, favorites
    } = req.body;

    //обновляем толькл то что пришло
    const updateUser = {
        ...user,
        base_currency: base_currency || user.base_currency,
        favorites: favorites || user.favorites,
        updated_at: new Date().toISOString(),
    };

    const savedUser = await 
    updateUserInDb(updateUser);
    res.json(savedUser);
}
