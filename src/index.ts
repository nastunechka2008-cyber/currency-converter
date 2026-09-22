import dotenv from 'dotenv'; // библиотека читающая .env
dotenv.config(); // читаем файлтзч

import express, { Application, 
Request, Response } from 'express';

import { errorHandler } from './middleware/errorHandler';
import currencyRoutes from './routes/currencyRoutes';

import cookieParser from 'cookie-parser';
import { authMiddlewer } from './middleware/auth';


const app: Application = express(); 
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(authMiddlewer);

app.use('/api', currencyRoutes);

app.use(errorHandler);

app.get('/', (req: Request, res:
Response) => { 
    res.send('Hello from Currency Converter!');
});
app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`); 
});

