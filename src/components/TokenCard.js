// src/components/TokenCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TokenCard({ token, onPress }) {
  const changeColor = token.priceChange24h >= 0 ? '#0f0' : '#f00';

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{token.name} ({token.symbol})</Text>
      <Text style={styles.price}>${token.price.toFixed(2)}</Text>
      <Text style={[styles.change, { color: changeColor }]}>
        {token.priceChange24h.toFixed(2)}%
      </Text>
      <Text style={styles.price}>{token. mintAddress}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  name: { color: '#FFF', fontSize: 16 },
  price: { color: '#FFF', fontSize: 14 },
  change: { fontSize: 14 },
});
