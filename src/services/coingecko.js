// src/services/coingecko.js
import axios from 'axios';

// const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

// export const fetchTrendingTokens = async () => {
//   const { data } = await axios.get(
//     `${COINGECKO_URL}/coins/markets`,
//     {
//       params: {
//         vs_currency: 'usd',
//         order: 'market_cap_desc',
//         per_page: 10,
//         page: 1,
//         sparkline: false,
//       },
//     }
//   );
//   return data;
// };


// services/coingecko.js

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
