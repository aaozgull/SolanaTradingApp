// src/screens/TokenDetailScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getQuote } from '../services/jupiter';

export default function TokenDetailScreen({ route, navigation }) {
  const { token } = route.params; // Pass token from HomeScreen
  const [amount, setAmount] = useState('0');
  const [result, setResult] = useState(null);

  const handleTrade = async () => {
    try {

       Alert.alert('token.mintAddress', token.mintAddress);
      // const quote = await getQuote({
      //   inputMint: 'So11111111111111111111111111111111111111112', // SOL mint address
      //   outputMint: token.mintAddress,
      //   amount: Number(amount) * 1e9, // Convert SOL to lamports
      // });
const quote = await getQuote({
  inputMint: 'So11111111111111111111111111111111111111112',
  outputMint: 'DezXGUC5po7HpG2KzZMjC7R6hRPAW6rE2cPrFvN77B9', // BONK
  amount: 10000000,
});


      Alert.alert('quote', quote);
      setResult(quote);
      alert('Trade executed (mock)');
    } catch (err) {
      console.error(err);
      Alert.alert('Trade Error', err?.message || JSON.stringify(err));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{token.name}</Text>
      <Text style={styles.price}>${token.price.toFixed(2)}</Text>
      <TextInput
        placeholder="Amount in USD"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <Button title="Execute Trade" onPress={handleTrade} />
      {result && (
        <Text style={styles.result}>Quote: {JSON.stringify(result, null, 2)}</Text>
      )}
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent:'center',  backgroundColor: '#121212', padding: 20 },
  name: { color: '#FFF', fontSize: 24, marginBottom: 10 },
  price: { color: '#FFF', fontSize: 20, marginBottom: 20 },
  input: { backgroundColor: '#1E1E1E', color: '#FFF', padding: 12, borderRadius: 8, marginBottom: 20 },
  result: { color: '#0F0', marginTop: 20 },
});
