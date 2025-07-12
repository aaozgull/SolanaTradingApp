import React, { createContext, useContext, useState, useEffect } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const jupiterRes = await fetch('https://cache.jup.ag/tokens');
        const jupiterTokens = await jupiterRes.json();

        const coingeckoRes = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        );
        const coingeckoTokens = await coingeckoRes.json();

        // const merged = coingeckoTokens.map((cg) => {
        //   const jup = jupiterTokens.find(
        //     (j) => j.extensions?.coingeckoId === cg.id
        //   );
        //   return {
        //     ...cg,
        //     mintAddress: jup ? jup.address : null,
        //   };
        // });
        const merged = coingeckoTokens.map((cg) => {
          const jup = jupiterTokens.find(
            (j) =>
              j.extensions?.coingeckoId === cg.id ||
              j.symbol.toLowerCase() === cg.symbol.toLowerCase()
          );
          return {
            ...cg,
            mintAddress: jup ? jup.address : null,
          };
        });

        setTokens(merged);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <TokenContext.Provider value={{ tokens, loading }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);
