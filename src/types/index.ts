export interface User {
    user_id: string;
    base_currency: string;
    favorites: string[];
    created_at: string;
    update_at: string;
} 

export interface RatesResponse{
    base: string;
    rates: Record<string, number> // ключ строка, значение число
}

