import dotenv from 'dotenv'; // библиотека читающая .env
dotenv.config(); // читаем файлтзч

import express, { Application, 
Request, Response } from 'express';

import {User} from './types';
import { errorHandler } from './middleware/errorHandler';
import currencyRoutes from './routes/currencyRoutes';
import { createUser, getUserById } from './repositories/userRepository';

const app: Application = express(); 
const PORT = 3000;

app.use(express.json());

app.use('/api', currencyRoutes);

app.use(errorHandler);

const testUser: User = {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    base_currency: 'USD',
    favorites: ['EUR', 'GBP'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

createUser (testUser)
    .then((user) =>{
        console.log('пользователь создан: ', user);
    })
    .catch((error) => {
        console.error('Ошибка: ', error);
    });

console.log(testUser);

app.get('/', (req: Request, res:
Response) => { 
    res.send('Hello from Currency Converter!');
});
app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`); 
});

