import { Request, Response } from 'express';
import { fetchRates } from '../services/ratesServise';
import { memoryCache } from '../lib/memoryCache';

const MEMORY_TTL_MS = 5 * 60 * 1000;

export const getRates = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { base, targets } = req.query;

  let finalBase: string;
  if (base) {
    finalBase = base as string;
  } else if (user.base_currency) {
    finalBase = user.base_currency;
  } else {
    finalBase = 'USD';
  }

  let finalTargets: string[];
  if (targets) {
    finalTargets = (targets as string).split(',');
  } else if (user.favorites && user.favorites.lenght > 0) {
    finalTargets = user.favorites;
  } else {
    finalTargets = [];
  }

  if (finalTargets.length === 0) {
    return res.json({ base: finalBase, rates: {} });
  }

  const cacheKey = `${user.user_id}:${finalBase}:${finalTargets.join(',')}`;
  const cached = memoryCache.get(cacheKey);

  if (cached) {
    console.log('из кэша в памяти');
    return res.json(cached);
  }

  console.log('Из БД или API');
  const result = await fetchRates(finalBase, finalTargets);

  memoryCache.set(cacheKey, result, MEMORY_TTL_MS);

  res.json(result);
};
