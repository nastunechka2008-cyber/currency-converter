import { Request, Response } from 'express';
import { updateUser as updateUserInDb } from '../repositories/userRepository';

import { isValidCurrencu, isValidFavorites } from '../utils/validators';

export const getUser = (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { base_currency, favorites } = req.body;

  if (base_currency !== undefined && !isValidCurrencu(base_currency)) {
    // проверяем только если поле пришло
    return res.status(400).json({
      error: 'base_currency должен быть сьрокой из 3 заглавных букв. ',
    });
  }

  if (favorites !== undefined && !isValidFavorites(favorites)) {
    return res.status(400).json({
      error: 'favorites должен быть массивом строк из 3 заглавных букв',
    });
  }

  //обновляем толькл то что пришло
  const updateUser = {
    ...user,
    base_currency: base_currency || user.base_currency,
    favorites: favorites || user.favorites,
    updated_at: new Date().toISOString(),
  };

  const savedUser = await updateUserInDb(updateUser);
  res.json(savedUser);
};
