// // src/services/privy.js
// import { PrivyClient } from '@privy-io/react-auth';
// import { Keypair } from '@solana/web3.js';

// let privy;

// export const initPrivy = () => {
//   privy = new PrivyClient({ appId: 'cmcxtg5dd02cpju0l79igrajg' }); // Replace with your actual Privy App ID
//   return privy;
// };

// export const loginWithEmail = async (email) => {
//   const response = await privy.loginWithEmail(email);
//   return response;
// };

// export const createEmbeddedWallet = () => {
//   const wallet = Keypair.generate();
//   return wallet;
// };


/// src/services/privy.js
import axios from 'axios';
import { Buffer } from 'buffer';
import {Alert} from 'react-native';

// Replace with your Privy App ID



const PRIVY_API_URL = 'https://api.privy.io/v1'; // ✅ Base REST API URL
const PRIVY_APP_ID = 'cmcxtg5dd02cpju0l79igrajg';              // 👉 Replace with your actual App ID
const PRIVY_APP_SECRET = '5JY1UxmAjhXTd6tKQERNnHhGRXCFDakX4Nu3MwNwmKjcVAnrmhFjLLi7hiJrtVbJTMHrpyUGgNJqtoPN8UghKvtn';      // 👉 Replace with your actual App Secret

// 🔒 Encode Basic Auth: app_id:app_secret
const authHeader = Buffer.from(`${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`).toString('base64');

/**
 * Create a Solana wallet for the user.
 * Returns: { id, address, chain_type, created_at }
 */
export const createSolanaWallet = async () => {
  try {
    const { data } = await axios.post(
      `${PRIVY_API_URL}/wallets`,
      {
        chain_type: 'solana', // 👈 Solana chain type
      },
      {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'privy-app-id': PRIVY_APP_ID,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ New Solana wallet created:', data);
    return data;
  } catch (error) {
    console.error('❌ Error creating Solana wallet:', error.response?.data || error.message);
    throw error;
  }
};

