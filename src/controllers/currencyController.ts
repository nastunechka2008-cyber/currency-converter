import { Request, Response } from "express";

export const getCurrencies = (req:  Request, res: Response )=> { // принремаеи запрос и ответ 
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
    res.json(currencies);
};