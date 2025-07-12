// src/screens/TokenDetailScreen.js
import React, { useState } from 'react';
import { View,ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getQuote, getSwapTransaction } from '../services/jupiter';
import { Connection, VersionedTransaction } from '@solana/web3.js';
import * as Buffer from 'buffer';
import { useAuth } from '../context/AuthContext';
import TabBar from '../components/TabBar';
import PortfolioName from '../components/PortfolioName';
import NumberInputWithStepper from '../components/NumberInputWithStepper';
import ActionButton from '../components/ActionButton';
import { useTokenContext } from '../context/TokenContext';

global.Buffer = global.Buffer || Buffer; // Needed for React Native

const connection = new Connection('https://api.mainnet-beta.solana.com');

export default function TokenDetailScreen({ route, navigation }) {
   const { tokens, loading } = useTokenContext();

  // Try to get token from route
  let token = route.params?.token;
  const balance = route.params?.balance;

  // Fallback: if no token passed in, use the top token
  if (!token && tokens.length > 0) {
    token = tokens[0];
  }  
  const displayBalance = balance ?? token?.value?? 0;

  const [amount, setAmount] = useState('0');
  const [activeTab, setActiveTab] = useState('Buy');
  const [quoteAmount, setQuoteAmount] = useState('0.00');
   const { wallet} = useAuth();
 
  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
    // Optionally: auto-fetch quote when amount changes
  };

  const handleTrade = async () => {
    if (!wallet) {
      Alert.alert('Error', 'Wallet not found.');
      return;
    }
    if (!Number(amount) || Number(amount) <= 0) {
      Alert.alert('Error', 'Amount must be greater than zero.');
      return;
    }


    
    if (!token.mintAddress) {
      Alert.alert('Error', `Invalid output mint address. ${token.mintAddress}` );
      return;
    }
    try {
      const quote = await getQuote({
        inputMint: 'So11111111111111111111111111111111111111112',
        outputMint: token.mintAddress,
        amount: Number(amount) * 1e9,
      });

      const swapTxBase64 = await getSwapTransaction(quote, wallet.address);

      // Calculate how much user will receive
      const outputAmount = quote.outAmount / 1e9; // adjust decimals if needed
      setQuoteAmount(outputAmount.toFixed(6));

      const txnBuffer = Buffer.Buffer.from(swapTxBase64, 'base64');
      const transaction = VersionedTransaction.deserialize(txnBuffer);

      // ✅ Sign with Privy wallet
      const signedTx = await wallet.privySigner.signTransaction(transaction);

      // ✅ Send
      const txid = await connection.sendRawTransaction(signedTx.serialize());
      Alert.alert('Success!', `Trade sent: ${txid}`);
      

    } catch (err) {
      console.error(err);
      Alert.alert('Trade error', err.message);
    }
  };
    if (loading || !token) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
              <PortfolioName name={token.name} symbol={token.symbol} balance={displayBalance} change={displayBalance * 0.02} />
              <View style={{ height: 200, backgroundColor: '#1E1E1E', borderRadius: 12 }} /> 

                
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={['Buy', 'Sell', 'Exchange']}
      />

      {/* Render content based on active tab */}
      {activeTab === 'Buy' && <View>{/* Buy form */}</View>}
      {activeTab === 'Sell' && <View>{/* Sell form */}</View>}
      {activeTab === 'Exchange' && <View>{/* Exchange form */}</View>}
    
     <NumberInputWithStepper
          label="Amount in USD"
          value={amount}
          setValue={handleAmountChange}

          isVisible={true}
      />

      <NumberInputWithStepper
          label="You'll receive"
          value={quoteAmount}
          setValue={() => {}} // Disable editing
      />

      <ActionButton activeTab={activeTab} onPress={handleTrade} />
     
      {route.params  && <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>}

        </View>
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1,  backgroundColor: '#121212',  },
  container: { justifyContent:'center',  padding: 20, marginTop:50 },
  name: { color: '#FFF', fontSize: 24, marginBottom: 10 },
  price: { color: '#FFF', fontSize: 20, marginBottom: 20 },
  input: { backgroundColor: '#1E1E1E', color: '#FFF', padding: 12, borderRadius: 8,},
  result: { color: '#0F0', marginTop: 20 },
  label: { color: '#aaa', marginBottom: 8, marginTop: 20  },
  backButton: {
  position: 'absolute',
  top: 40,          // Adjust for status bar height if needed
  left: 20,
  zIndex: 10,
  backgroundColor: '#1E1E1E',
  borderRadius: 20,
  padding: 8,
},

backArrow: {
  color: '#fff',
  fontSize: 20,
},

});
