import axios from 'axios';
export const fetchRates = async (
base: string, targets: string[]) => {
    const response = await axios.get(`https://open.er-api.com/v6/latest/${base}`); 
    const allRates = response.data.rates;

const filtered: Record<string, number> = {}; 
for (const target of targets) { 
    if (allRates[target]) { 
        filtered[target] = allRates[target]; 
    } 
}

return { base, rates: filtered }; 
};