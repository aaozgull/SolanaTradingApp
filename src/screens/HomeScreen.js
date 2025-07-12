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
import useTokens from '../hooks/useTokens';
import { useTokenContext } from '../context/TokenContext';

export default function HomeScreen({ navigation }) {
  const [period, setPeriod] = useState('1M');
  const [query, setQuery] = useState('');
 // const [tokens, setTokens] = useState([]);
 // const [loading, setLoading] = useState(true);

  const { wallet,logout } = useAuth();
  const [balance, setBalance] = useState(0);
  //const tokens1 = useTokens();
  const { tokens, loading } = useTokenContext();

  

  useEffect(() => {
   
    const fetchBalance = async () => {
      if (!wallet) return;

      try {
       
       const solBalance = await getAccountBalance(wallet.address);       
        const solPrice = await getSolPrice();      
       const balanceUSD = solBalance * solPrice;
        setBalance(balanceUSD);
      } catch (err) {
        console.error(err);
     
      }
    };

    fetchBalance();
  }, [wallet]);

  const validTokens = tokens.filter((t) => t.mintAddress);

  
  // Filter tokens by search query
  const filteredTokens = validTokens.filter((token) =>
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
              <PortfolioBalance balance={balance} change={balance * 0.02} />
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
             // mintAddress={item.mintAddress}
              color={item.price_change_percentage_24h > 0
                  ? 'green'
                  : item.price_change_percentage_24h < -0.50
                    ? 'red'
                    : 'blue'}
                  onPress={() =>
                  navigation.navigate('Tokens', {
                  screen: 'TokenDetail',
                  params: { token: item, balance: balance },
                })
              }
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
                   // mintAddress={token.mintAddress}
                    color={
                      index === 0 ? 'orange'
                      : index === 1 ? 'skyblue'
                      : index === 2 ? 'purple'
                      : 'gray' // fallback if needed
                    }
                    onPress={() => navigation.navigate('TokenDetail', { token, 'balance':balance })}
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
