// src/components/PortfolioBalance.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PortfolioBalance({ balance }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Portfolio Balance</Text>
      <Text style={styles.amount}>${balance.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  label: {
    color: '#AAA',
    fontSize: 14,
  },
  amount: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
