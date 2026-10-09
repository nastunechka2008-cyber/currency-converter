export const isValidCurrencu = (currency: any): boolean => {
  return typeof currency === 'string' && /^[A-Z]{3}$/.test(currency); // строка из стринг и 3 заглавных букв
};

export const isValidFavorites = (favorites: any): boolean => {
  if (!Array.isArray(favorites))
    // проверяем на массив строк
    return false;
  return favorites.every((item) => isValidCurrencu(item)); // каждый элемент проходит проверку
};
