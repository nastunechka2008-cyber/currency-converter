
import { Request, Response } from 'express';
import { fetchRates } from '../services/ratesServise';
import { memoryCache } from '../lib/memoryCache';
import { AppError } from '../utils/AppError';

const MEMORY_TTL_MS = 5 * 60 * 1000;

// Проверка формата кода валюты
const isValidCurrency = (value: string): boolean => {
  return /^[A-Z]{3}$/.test(value);
};

// Проверка и нормализация одного кода валюты
const parseCurrency = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const currency = value.trim().toUpperCase();

  return isValidCurrency(currency) ? currency : null;
};

export const getRates = async (req: Request, res: Response) => {
  const user = req.user;
  const { base, targets } = req.query;

  // Проверяем базовую валюту
  const parsedBase = parseCurrency(base);

  const finalBase =
    base !== undefined
      ? parsedBase
      : parseCurrency(user.base_currency) ?? 'USD';

  if (!finalBase) {
    throw new AppError('Некорректный код базовой валюты', 400);
  }

  // Проверяем целевые валюты
  let finalTargets: string[];

  if (targets !== undefined) {
    if (typeof targets !== 'string') {
      throw new AppError(
        'targets должен содержать коды валют через запятую',
        400
      );
    }

    finalTargets = targets
      .split(',')
      .map((value) => value.trim().toUpperCase())
      .filter(Boolean);

    if (!finalTargets.every(isValidCurrency)) {
      throw new AppError('Некорректные коды валют в targets', 400);
    }
  } else if (user.favorites.length > 0) {
    finalTargets = user.favorites.map((value) =>
      value.trim().toUpperCase()
    );

    if (!finalTargets.every(isValidCurrency)) {
      throw new AppError('Некорректные коды валют в избранном', 400);
    }
  } else {
    finalTargets = [];
  }

  // Если целевые валюты не указаны, возвращаем пустой список курсов
  if (finalTargets.length === 0) {
    return res.json({
      base: finalBase,
      rates: {},
    });
  }

  // Формируем ключ кэша
  const cacheKey =
    `${user.user_id}:${finalBase}:${finalTargets.join(',')}`;

  const cached = memoryCache.get(cacheKey);

  if (cached) {
    console.log('Из кэша в памяти');
    return res.json(cached);
  }

  // Получаем курсы валют
  console.log('Из БД или API');

  const result = await fetchRates(finalBase, finalTargets);

  // Сохраняем результат в кэш на 5 минут
  memoryCache.set(cacheKey, result, MEMORY_TTL_MS);

  return res.json(result);
};
