import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Currency Converter API',
      version: '1.0.0',
      description: 'API для конвертации валют',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Локальный сервер',
      },
    ],
  },
  apis: ['./src/routes/*.yaml'],
};

export const swaggerSpec = swaggerJsdoc(options);

console.log('swagger API paths: ', options.apis);