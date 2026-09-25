import { Request, Response } from "express";
import { getAllCurrencies } from "../services/currencyServiece";

export const getCurrencies = (req:  Request, res: Response )=> { // принремаеи запрос и ответ 
    const currencies = getAllCurrencies();
    res.json(currencies);
};