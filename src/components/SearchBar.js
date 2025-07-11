// src/components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ query, setQuery }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search tokens..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
  input: {
    color: '#FFF',
    fontSize: 16,
  },
});
