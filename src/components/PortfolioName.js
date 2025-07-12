// components/PortfolioBalance.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PortfolioName({ name, symbol, balance, change }) {
  // Safely calculate percent change
  const percentChange =
    balance && balance !== 0
      ? ((change / balance) * 100).toFixed(2)
      : '0.00';

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>{name}</Text>
      <Text style={styles.label}>{symbol}</Text>
      <Text style={styles.balance}>{balance}</Text>
      <Text
        style={[
          styles.change,
          { color: change >= 0 ? '#0f0' : '#f00' },
        ]}
      >
        {change >= 0 ? '+' : ''}
        {change.toLocaleString()}$ ({percentChange}%)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    marginVertical: 30,
    paddingBottom: 40,
    borderBottomColor: '#1E1E1E',
  },
  label: { color: '#aaa', marginBottom: 8 },
  balance: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
  change: { fontSize: 16, marginTop: 4 },
});
