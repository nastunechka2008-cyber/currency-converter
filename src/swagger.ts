import { verify } from "node:crypto";
import { title } from "node:process";
import { describe } from "node:test";
import swaggerJSDoc from "swagger-jsdoc";

const  options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title: 'Currency Converter API',
            version: '1.0.0',
            description: 'API для конверции валют'
        },
        servers: [
            {
                url: 'http://localhost:3000', 
                description: 'Локальный сервер',
            },
        ],
    },
    apis:['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);