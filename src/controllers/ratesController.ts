import { Request, Response } from "express";
import { fetchRates } from "../services/ratesServise";

export const getRates = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const {base, targets} = req.query;

    let finalBase: string;
    if (base) {
        finalBase = base as string;
    } else if (user.base_currency) {
        finalBase = user.base_currency;
    } else {
        finalBase = 'USD';
    }

    let finalTargets: string[];
    if (targets) {
        finalTargets =(targets as string).split(',');
    } else if (user.favorites && user.favorites.lenght > 0){
        finalTargets = user.favorites;
    } else {
        finalTargets =[];
    }

    if (finalTargets.length === 0) {
        return res.json({base: finalBase, rates: {} });
    }


// получаем курсы
const result = await fetchRates(finalBase, finalTargets);
res.json(result);

} 