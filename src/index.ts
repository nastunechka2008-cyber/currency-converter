import dontev from 'dotenv';
dontev.config();
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import express, { Application, Request, Response } from 'express';
import { errorHandler } from './middleware/errorHandler';
import currencyRoutes from './routes/currencyRoutes';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/auth';
import userRoutes from './routes/userRoutes';
import ratesRoutes from './routes/ratesRoutes';

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(authMiddleware);

app.use('/api', currencyRoutes);
app.use('/api', userRoutes);
app.use('/api', ratesRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Currency Converter!');
});

app.use((_req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
