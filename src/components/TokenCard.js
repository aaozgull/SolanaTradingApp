// src/components/TokenCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function TokenCard({ token, onPress }) {
  const priceChange = token.priceChange24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        {token.icon ? (
          <Image source={{ uri: token.icon }} style={styles.icon} />
        ) : (
          <View style={styles.placeholderIcon} />
        )}
        <View>
          <Text style={styles.symbol}>{token.symbol}</Text>
          <Text style={styles.name}>{token.name}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>${token.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: isPositive ? '#0f0' : '#f44' }]}>
          {isPositive ? '📈 +' : '📉 '}
          {priceChange.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 40, height: 40, marginRight: 12, borderRadius: 20 },
  placeholderIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#444',
    borderRadius: 20,
    marginRight: 12,
  },
  symbol: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  name: { color: '#AAA', fontSize: 12 },
  right: { alignItems: 'flex-end' },
  price: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  change: { fontSize: 12 },
});
