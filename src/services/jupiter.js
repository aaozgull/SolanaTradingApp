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
    const response = await fetch('https://cache.jup.ag/tokens');
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

// services/jupiter.js

export async function getSwapTransaction(quote, userPublicKey) {
  const response = await fetch('https://quote-api.jup.ag/v6/swap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quoteResponse: quote,
      userPublicKey,
      wrapUnwrapSOL: true,   // optional for SOL
      slippageBps: 50,       // 0.5% slippage tolerance
    }),
  });

  if (!response.ok) {
    throw new Error('Swap transaction failed');
  }

  const json = await response.json();
  return json.swapTransaction;  // <-- base64 encoded transaction
}


