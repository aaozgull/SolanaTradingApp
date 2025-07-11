// src/services/coingecko.js
import axios from 'axios';

const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

export const fetchTrendingTokens = async () => {
  const { data } = await axios.get(
    `${COINGECKO_URL}/coins/markets`,
    {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    }
  );
  return data;
};
