// src/services/jupiter.js
import axios from 'axios';

const LITE_API = 'https://lite-api.jup.ag/tokens/v2';
const QUOTE_API = 'https://quote-api.jup.ag/v6';

export const fetchJupiterCategoryTokens = async (category) => {
  const { data } = await axios.get(`${LITE_API}/${category}?limit=20`);
  return data;
};

// services/jupiter.js
export async function getTokens() {
  try {
    const response = await fetch('https://quote-api.jup.ag/v6/tokens');
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
}


export const searchJupiterTokens = async (query) => {
  const { data } = await axios.get(`${LITE_API}/search?query=${query}`);
  return data;
};

export const getQuote = async ({ inputMint, outputMint, amount }) => {
  const { data } = await axios.get(`${QUOTE_API}/quote`, {
    params: {
      inputMint,
      outputMint,
      amount,
      slippageBps: 50,
    },
  });
  return data;
};
