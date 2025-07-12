import { useState, useEffect } from 'react';

export default function useTokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // Fetch Jupiter tokens
        const jupiterRes = await fetch('https://cache.jup.ag/tokens');
        const jupiterTokens = await jupiterRes.json();

        // Fetch CoinGecko tokens
        const cgRes = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        );
        const coingeckoTokens = await cgRes.json();

        // Merge by symbol
        // const merged = coingeckoTokens.map((cg) => {
        //   const jup = jupiterTokens.find(
        //     (j) => j.symbol.toLowerCase() === cg.symbol.toLowerCase()
        //   );

        //   return {
        //     ...cg,
        //     mintAddress: jup ? jup.address : null,
        //   };
        // });
        const merged = coingeckoTokens.map(cg => {
        const jup = jupiterTokens.find(j => j.extensions?.coingeckoId === cg.id);
        return {
          ...cg,
          mintAddress: jup ? jup.address : null,
        };
      });

        setTokens(merged);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTokens();
  }, []);

  return tokens;
}
