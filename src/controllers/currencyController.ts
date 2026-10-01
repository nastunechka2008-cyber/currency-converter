import { Request, Response } from "express";
import { getAllCurrencies, getSupportedCurrencies } from "../services/currencyServiece";

export const getCurrencies = async (req:  Request, res: Response )=> { // принремаеи запрос и ответ 
    const currencies = await getAllCurrencies();
    getSupportedCurrencies();
    res.json(currencies);
};