import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import ActionButton from '../components/ActionButton';

export default function LoginScreen() {
  const { login, user, wallets, isReady } = usePrivy();

  if (!isReady) {
    return <Text style={{ color: '#fff' }}>Loading Privy...</Text>;
  }

  const handleLogin = async () => {
    try {
      await login();
      console.log('Logged in!', user);

      const signer = await wallets[0].getSigner({ chain: 'solana' });
      console.log('Signer:', signer);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Privy</Text>

      <ActionButton title="Login with Privy" onPress={handleLogin} />

      <Text style={styles.info}>
        Your Solana wallet is created automatically via Privy.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 24, color: '#fff', marginBottom: 24, textAlign: 'center' },
  info: { marginTop: 24, color: '#aaa', textAlign: 'center' },
});
