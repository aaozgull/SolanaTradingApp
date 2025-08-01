import React, { createContext, useState, useContext } from 'react';
import { createSolanaWallet } from '../services/privy';
import { privy } from '../lib/privyClient';

import { Alert } from 'react-native';

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
    //Alert.alert('walletData.address', walletData.address);
    console.log('New wallet:', walletData);
  };

   const logout = () => {
    setUser(null);
    setWallet(null);
  };


  return (
    <AuthContext.Provider value={{ user, wallet, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


