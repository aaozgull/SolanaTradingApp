import axios from 'axios';
import { Buffer } from 'buffer';
import {Alert} from 'react-native';
import { PRIVY_APP_ID,PRIVY_APP_SECRET } from '../Utils/Config';


const PRIVY_API_URL = 'https://api.privy.io/v1'; // ✅ Base REST API URL
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

   
    return data;
  } catch (error) {
    console.error('❌ Error creating Solana wallet:', error.response?.data || error.message);
    throw error;
  }
};

