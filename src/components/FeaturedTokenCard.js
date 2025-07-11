import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function FeaturedTokenCard({ symbol, name, value, change, onPress,color }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.icon,{backgroundColor: color}]}><Text style={styles.iconText}>{symbol[0]}</Text></View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.price}>{value}</Text>
        <Text style={[styles.change, { color: change >= 0 ? '#0f0' : '#f00' }]}>
          {change >= 0 ? '+' : ''}{change}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#1E1E1E', borderRadius: 8, padding: 12, marginBottom: 12, alignItems: 'center' },
  icon: { width: 32, height: 32, borderRadius: 8,  justifyContent: 'center', alignItems: 'center' },
  iconText: { color: '#fff' },
  info: { flex: 1, marginLeft: 12 },
  name: { color: '#fff', fontWeight: 'bold' },
  symbol: { color: '#aaa', fontSize: 12 },
  value: { alignItems: 'flex-end' },
  price: { color: '#fff' },
  change: { fontSize: 12 },
});
