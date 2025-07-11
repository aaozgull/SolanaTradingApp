// src/screens/TokenListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
// src/screens/TokenListScreen.js
import { fetchJupiterTokens } from '../services/jupiter'; 


export default function TokenListScreen({ navigation }) {
  const [tokens, setTokens] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    
    const loadTokens = async () => {
      const data = await fetchJupiterTokens();
      Alert.alert('Loaded', `Got ${data.length} tokens`);
      setTokens(data);
    };
    loadTokens();
  }, []);

  const filteredTokens = tokens.filter((t) =>
    t.symbol.toLowerCase().includes(query.toLowerCase()) ||
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tokens..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredTokens}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tokenItem}
            onPress={() =>
              navigation.navigate('TokenDetail', {
                token: {
                  name: item.name,
                  symbol: item.symbol,
                  mintAddress: item.address, // ✅ Valid mint
                  price: item.price || 0,
                },
              })
            }
          >
            <Text style={styles.tokenText}>{item.symbol} - {item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent:'center', paddingTop:60,backgroundColor: '#121212', padding: 16 },
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
