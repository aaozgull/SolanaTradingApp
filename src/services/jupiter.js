// src/services/jupiter.js
import axios from 'axios';

const JUPITER_API = 'https://quote-api.jup.ag/v6';

export const fetchJupiterTokens = async () => {
  const { data } = await axios.get(`${JUPITER_API}/tokens`);
  return data;
};

export const getQuote = async ({ inputMint, outputMint, amount }) => {
  const { data } = await axios.get(`${JUPITER_API}/quote`, {
    params: {
      inputMint,
      outputMint,
      amount,
      slippageBps: 50,
    },
  });
  return data;
};
