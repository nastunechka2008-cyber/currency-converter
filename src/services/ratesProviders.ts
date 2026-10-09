import axios from 'axios';
export interface RatesProvider {
  fetchRates(
    base: string,
    targets: string[]
  ): Promise<{ base: string; rates: Record<string, number> }>;
}

class OpenErApiProvider implements RatesProvider {
  async fetchRates(base: string, targets: string[]) {
    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${base}`
    );
    const allRates = response.data.rates;
    const filtered: Record<string, number> = {};

    for (const target of targets) {
      if (allRates[target]) {
        filtered[target] = allRates[target];
      }
    }

    return { base, rates: filtered };
  }
}
export const ratesProvider: RatesProvider = new OpenErApiProvider();
