import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

import dotenv from 'dotenv'; // библиотека читающая .env
dotenv.config(); // читаем файлтзч

import express, { Application, 
Request, Response } from 'express';

import { errorHandler } from './middleware/errorHandler';
import currencyRoutes from './routes/currencyRoutes';

import cookieParser from 'cookie-parser';
import { authMiddlewar } from './middleware/auth';

import userRoutes from './routes/userRoutes';

import ratesRoutes from './routes/ratesRoutes'

const app: Application = express(); 
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(authMiddlewar);

app.use('/api', currencyRoutes);
app.use('/api', userRoutes);
app.use('/api', ratesRoutes);

app.use(errorHandler);

app.get('/', (req: Request, res:
Response) => { 
    res.send('Hello from Currency Converter!');
});
app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`); 
});

