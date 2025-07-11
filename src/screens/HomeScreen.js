// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button
} from 'react-native';

import SearchBar from '../components/SearchBar';
import PortfolioBalance from '../components/PortfolioBalance';
import PeriodSelector from '../components/PeriodSelector';
import PortfolioCard from '../components/PortfolioCard';
import FeaturedTokenCard from '../components/FeaturedTokenCard';
import ActionButtons from '../components/ActionButtons';
import { useAuth } from '../context/AuthContext';
import { getAccountBalance, getSolPrice } from '../services/solana';
import WalletInfo from '../components/WalletInfo';

export default function HomeScreen({ navigation }) {
  const [period, setPeriod] = useState('1M');
  const [query, setQuery] = useState('');
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const { wallet,logout } = useAuth();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    Alert.alert('wallet home screen', wallet);
    const fetchBalance = async () => {
      if (!wallet) return;

      try {
        //Alert.alert('wallet.address home screen', wallet.address);
        <WalletInfo address={wallet.address}/>
       const solBalance = await getAccountBalance(wallet.address);
       Alert.alert('solBalance', solBalance);
       // const solPrice = await getSolPrice();
       //  Alert.alert('solPrice', solPrice);
        //const balanceUSD = solBalance * solPrice;
       // setBalance(balanceUSD);
      } catch (err) {
        console.error(err);
        Alert.alert('Error home screen', err);
      }
    };

    fetchBalance();
  }, [wallet]);

  // Example: Fetch dynamic tokens (replace with your CoinGecko or Jupiter call)
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // Example fetch — replace with your real endpoint!
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        const data = await res.json();
        setTokens(data.slice(0, 5)); // Limit for testing
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Filter tokens by search query
  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(query.toLowerCase())
  );

  const featuredTokens = tokens
  .sort((a, b) => b.market_cap - a.market_cap) // Top by market cap
  .slice(0, 3);


  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="skyblue" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <SearchBar query={query} setQuery={setQuery} />
              {/* <WalletInfo/> */}
              <PortfolioBalance balance={balance} change={1764} />
              <View style={{ height: 200, backgroundColor: '#1E1E1E', borderRadius: 12 }} />
              <PeriodSelector selected={period} onSelect={setPeriod} />
              <ActionButtons />

              <Text style={styles.heading}>Portfolio positions</Text>
            </>
          }
          data={filteredTokens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PortfolioCard
              symbol={item.symbol.toUpperCase()}
              name={item.name}
              amount={item.current_price.toFixed(2)}
              value={item.current_price.toFixed(2)}
              change={item.price_change_percentage_24h}
              color={item.price_change_percentage_24h > 0
    ? 'green'
    : item.price_change_percentage_24h < -0.50
      ? 'red'
      : 'blue'}
            />
          )}
          ListFooterComponent={
            <>
               <Text style={styles.heading}>Featured Tokens</Text>
             {featuredTokens.slice(0, 3).map((token, index) => (
                  <FeaturedTokenCard
                    key={token.id}
                    symbol={token.symbol.toUpperCase()}
                    name={token.name}
                    value={token.current_price.toFixed(2)}
                    change={token.price_change_percentage_24h.toFixed(2)}
                    color={
                      index === 0 ? 'orange'
                      : index === 1 ? 'skyblue'
                      : index === 2 ? 'purple'
                      : 'gray' // fallback if needed
                    }
                  />
                ))}

            </>
          }
        />
      )}
       <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  heading: { color: '#fff', fontWeight: 'bold', marginVertical: 12 },
});
