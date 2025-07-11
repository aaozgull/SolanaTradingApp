import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useAuth } from '../context/AuthContext'; // ✅ If you use AuthContext

export default function WalletInfo() {
  const { wallet } = useAuth();

  if (!wallet || !wallet.address) return null;

  const copyAddress = () => {
    Clipboard.setString(wallet.address);
    Alert.alert('Copied!', `Wallet address copied:\n${wallet.address}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wallet Address:</Text>
      <Text selectable style={styles.address}>
        {wallet.address}
      </Text>
      <TouchableOpacity style={styles.button} onPress={copyAddress}>
        <Text style={styles.buttonText}>Copy Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1E1E1E', padding: 12, borderRadius: 8, marginVertical: 16 },
  label: { color: '#aaa', marginBottom: 4 },
  address: { color: '#fff', fontSize: 12 },
  button: { marginTop: 8, backgroundColor: 'skyblue', padding: 8, borderRadius: 4 },
  buttonText: { color: '#000', textAlign: 'center', fontWeight: 'bold' },
});
