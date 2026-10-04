import { ratesProvider, RatesProvider } from "./ratesProviders";

export const  fetchRates = async (base: string, target: string[]) => {
    return await ratesProvider.fetchRates(base, target);
};