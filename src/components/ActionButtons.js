import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ActionButtons() {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={[styles.button, styles.deposit]}>
        <Text style={[styles.buttonText, styles.depositText]}>Deposit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buy]}>
        <Text style={[styles.buttonText, styles.buyText]}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  deposit: {
    backgroundColor: '#FFF',
  },
  buy: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  depositText: {
    color: '#000',
  },
  buyText: {
    color: '#FFF',
  },
});
