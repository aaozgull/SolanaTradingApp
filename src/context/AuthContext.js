import React, { createContext, useState, useContext } from 'react';
import { createSolanaWallet } from '../services/privy';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);

  // ✅ Full REST flow — no magic links
  const login = async (email) => {
    console.log(`Logging in user: ${email}`);
    setUser({ email, id: Date.now().toString() });

    // ✅ Call Privy REST to create Solana wallet
    const walletData = await createSolanaWallet();
    setWallet({
      address: walletData.address,
      id: walletData.id,
    });

    console.log('New wallet:', walletData);
  };

  return (
    <AuthContext.Provider value={{ user, wallet, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
