// src/components/BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BottomNavigation({ navigation }) {
  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.item}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TokenDetail')}>
        <Text style={styles.item}>Tokens</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121212',
    padding: 12,
  },
  item: {
    color: '#FFF',
    fontSize: 16,
  },
});
