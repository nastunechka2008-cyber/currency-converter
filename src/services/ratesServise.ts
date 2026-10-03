import axios from 'axios';
import { getCacheRate, saveCachedRate} from '../repositories/ratesCacheRepository';

const CACHE_TTL_MS = 24*60*60*1000;

export const fetchRates = async (
base: string, targets: string[]) => {

    const filtered: Record<string, number> = {}; 
for (const target of targets) { 
    const cached = await 
    getCacheRate (base,target );

    if (cached) {
        const age  = Date.now() - new Date(cached.updated_at).getTime();
        if (age < CACHE_TTL_MS) {
            filtered[target] = cached.rate;
            continue;
        }
    }
}

    const response = await axios.get(`https://open.er-api.com/v6/latest/${base}`); 
    const allRates = response.data.rates;

    for (const target of targets) { 
        if (allRates[target]) { 
            filtered[target] = allRates[target]; 
            await saveCachedRate(base, target, allRates[target]); } }

return { base, rates: filtered };
}; 