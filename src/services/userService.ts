import {User} from '../types';
import {createUser, getUserById} from '../repositories/userRepository';

export const findeOrCreateUser = async (
    userId: string | null
) : Promise<User> => {
    if (!userId) {
        const {v4: uuidv4} = require ('uuid');
        const newUserId = uuidv4();
        const now = new Date().toISOString();

        const newUser: User = {
            user_id: newUserId,
            base_currency: 'USD',
            favorites: [],
            created_at: now,
            updated_at: now,
            };
        
            return await createUser(newUser);
    }

    const user = await getUserById(userId);

    if (user) {
        return user;
    }

    const now = new Date().toDateString();
    const newUser: User = {
        user_id: userId,
        base_currency: 'USD',
        favorites: [],
        created_at: now,
        updated_at: now,
    };

    return await createUser(newUser);
}