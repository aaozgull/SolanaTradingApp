// components/PeriodSelector.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PeriodSelector({ selected, onSelect }) {
  const periods = ['1W', '1M', '6M', '1Y'];
  return (
    <View style={styles.container}>
      {periods.map((p) => (
        <TouchableOpacity
          key={p}
          style={[styles.button, selected === p && styles.selected]}
          onPress={() => onSelect(p)}
        >
          <Text style={{ color: '#fff' }}>{p}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', marginVertical: 16 },
  button: { padding: 8, borderRadius: 8, marginHorizontal: 6, backgroundColor: '#333' },
  selected: { backgroundColor: '#00f' },
});
