// src/screens/TokenListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

import BottomNavigation from '../components/BottomNavigation';
import { fetchJupiterTokens, searchJupiterTokens } from '../services/jupiter';

export default function TokenListScreen({ navigation }) {
  const [tokens, setTokens] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const data = await fetchJupiterTokens();
        console.log('Loaded tokens:', data);
        setTokens(data);
      } catch (err) {
        console.error('Token fetch error:', err);
        Alert.alert('Error', err.message);
      }
    };
    loadTokens();
  }, []);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 0) {
      const data = await searchJupiterTokens(text);
      console.log('Search results:', data);
      setTokens(data);
    } else {
      const data = await fetchJupiterTokens();
      setTokens(data);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tokens..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={tokens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tokenItem}
            onPress={() =>
              navigation.navigate('TokenDetail', {
                token: {
                  name: item.name,
                  symbol: item.symbol,
                  mintAddress: item.id,
                  price: item.usdPrice || 0,
                },
              })
            }
          >
            <Text style={styles.tokenText}>{item.symbol} - {item.name}</Text>
          </TouchableOpacity>
        )}
      />
       <BottomNavigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, backgroundColor: '#121212', padding: 16 },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  tokenItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tokenText: { color: '#FFF' },
});
