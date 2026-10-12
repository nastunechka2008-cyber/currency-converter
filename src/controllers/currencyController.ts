import { Request, Response } from 'express';
import { getAllCurrencies } from '../services/currencyServiece';

export const getCurrencies = (req: Request, res: Response) => {
  res.json(getAllCurrencies());
};
