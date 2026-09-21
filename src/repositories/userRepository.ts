import { supabase } from '../lib/supabase';
import { User } from '../types';

export const createUser = async(user: User): Promise<User> => { // создакм пользователя в бд
    const {data, error} = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();

    if (error) throw error; //nвыбрасываем ошибку
    return data;
};

export const getUserById = async (userId: string): Promise<User | null> =>{ // ищем пользователя по айди 
    const {data, error} = await supabase 
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();

    if (error) return null;
    return data;
}