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
};

export const updateUser = async (user: User): Promise<User> => {
    const {data, error } = await supabase
    .from('users')
    .update(user)
    .eq('user_id', user.user_id)
    .select()
    .single();

    if (error) throw error;
    return data;
};