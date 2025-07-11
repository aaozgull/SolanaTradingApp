import React, { useEffect, useState, useContext } from 'react';
import { View,Button, FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import PortfolioBalance from '../components/PortfolioBalance';
import TokenCard from '../components/TokenCard';
import BottomNavigation from '../components/BottomNavigation';
import { fetchTrendingTokens } from '../services/coingecko';
import { AuthContext } from '../context/AuthContext';
import { SOLANA_MINTS } from '../constants/SOLANA_MINTS';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState(1000.0); // Mock balance

  const { user, wallet } = useContext(AuthContext);

  useEffect(() => {
    const loadTokens = async () => {
      const data = await fetchTrendingTokens();
      setTokens(data);
    };
    loadTokens();
  }, []);

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
      {/* ✅ Add your greeting + wallet address */}
      <Text style={styles.title}>👋 Welcome, {user?.email}</Text>
      <Text style={styles.sub}>Wallet: {wallet?.address}</Text>

      <SearchBar query={query} setQuery={setQuery} />

      {/* ✅ You can keep or remove this PortfolioBalance, up to you */}
      <PortfolioBalance balance={balance} />
<Button
    title="Pick a Token"
    onPress={() => navigation.navigate('TokenList')}
  />
      <FlatList
  data={filteredTokens}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => {
    const enrichedToken = {
      symbol: item.symbol.toUpperCase(),
      name: item.name,
      price: item.current_price,
      priceChange24h: item.price_change_percentage_24h,
      mintAddress: SOLANA_MINTS[item.symbol.toUpperCase()] || '',
    };

    return (
      <TokenCard
        token={enrichedToken}
        onPress={() =>
          navigation.navigate('TokenDetail', { token: enrichedToken })
        }
      />
    );
  }}
/>


      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 16,
  },
});
