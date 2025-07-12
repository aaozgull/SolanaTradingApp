// src/services/coingecko.js
import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function getCoinGeckoPrices(ids = []) {
  try {
    if (ids.length === 0) return [];

    const url = `${COINGECKO_API}/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('CoinGecko fetch error:', error);
    return {};
  }
}
