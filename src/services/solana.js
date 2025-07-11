import { Connection, PublicKey } from '@solana/web3.js';
import { Alert } from 'react-native';

export async function getAccountBalance(walletAddress) {
  try {
    console.log('walletAddress:', walletAddress);

    if (!walletAddress) {
      throw new Error('Invalid wallet address');
    }

    const connection = new Connection('https://api.mainnet-beta.solana.com');

    console.log('Connection established');
     

    const publicKey = new PublicKey(walletAddress);

    console.log('PublicKey created:', publicKey.toBase58());
   //Alert.alert('PublicKey created:', publicKey.toBase58());
    const balanceLamports = await connection.getBalance(publicKey);
   //Alert.alert('balanceLamports. ', balanceLamports);

    const balanceSOL = balanceLamports / 1e9;

    console.log(`Balance: ${balanceSOL} SOL`);

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
