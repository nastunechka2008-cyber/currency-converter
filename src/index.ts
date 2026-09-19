import express, { Application, 
Request, Response } from 'express';

import {User} from './types';

const app: Application = express(); 
const PORT = 3000;

app.use(express.json());

const testUser: User = {
    user_id: 'abc-123',
    base_currency: 'USD',
    favorites: ['EUR', 'GBP'],
    created_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
};

console.log(testUser);

app.get('/', (req: Request, res:
Response) => { 
    res.send('Hello from Currency Converter!');
});
app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`); 
});

