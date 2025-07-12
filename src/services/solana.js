import { Connection, PublicKey } from '@solana/web3.js';
import { Alert } from 'react-native';

export async function getAccountBalance(walletAddress) {
  try {
    if (!walletAddress) {
      throw new Error('Invalid wallet address');
    }

    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const publicKey = new PublicKey(walletAddress);
    const balanceLamports = await connection.getBalance(publicKey);   
    const balanceSOL = balanceLamports / 1e9;
    
    return balanceSOL;
  } catch (err) {
    console.error('getAccountBalance error:', err);
    Alert.alert('Error', err.message || 'Unknown error');
    return 0;
  }
}



export async function getSolPrice() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
  const json = await response.json();
  return json.solana.usd;
}
