import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation  = useNavigation();
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email);
      Alert.alert('Login Success', `Wallet created for ${email}`);
      navigation.navigate('Home');
    } catch (err) {
      console.error('Login failed:', err);
      Alert.alert('Error', 'Something went wrong during login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Privy (REST)</Text>
      <TextInput
        style={styles.input}
        placeholder="Your email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <Button title="Login & Create Wallet" onPress={handleLogin} />

      <Text style={styles.info}>
        This creates a real Solana wallet via Privy REST API.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 24, color: '#fff', marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#1e1e1e', borderRadius: 8, padding: 16, color: '#fff', marginBottom: 16 },
  info: { marginTop: 24, color: '#aaa', textAlign: 'center' },
});
