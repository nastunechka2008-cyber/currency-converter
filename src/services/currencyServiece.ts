import axios from "axios";

export const getAllCurrencies = (): string[] => {
    return ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
};

export const getSupportedCurrencies = async (): Promise<string[]> =>{
    const response = await axios.get('https://open.er-api.com/v6/latest/USD');
    const rates = response.data.rates;
    return Object.keys(rates);
}
