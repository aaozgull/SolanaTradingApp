// screens/HomeScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, Button, FlatList, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import PortfolioBalance from '../components/PortfolioBalance';
import PeriodSelector from '../components/PeriodSelector';
import PortfolioCard from '../components/PortfolioCard';
import FeaturedTokenCard from '../components/FeaturedTokenCard';
import ActionButtons from '../components/ActionButtons';
//import PortfolioLineChart from '../components/PortfolioLineChart';

export default function HomeScreen({ navigation }) {
  const [period, setPeriod] = useState('1M');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <SearchBar />
      <PortfolioBalance balance={192615.98} change={1764} />
       <View style={{ height: 200, backgroundColor: '#1E1E1E', borderRadius: 12 }} /> 
      {/* <PortfolioLineChart/> */}

      <PeriodSelector selected={period} onSelect={setPeriod} />
    
      <ActionButtons/>
      <Text style={styles.heading}>Portfolio positions</Text>
      <PortfolioCard symbol="V" name="V" amount={275.84} value={273.25} change={-0.84} color='blue'/>
      <PortfolioCard symbol="S" name="SPOT" amount={340.28} value={379.70} change={8.73} color='green'/>
      <PortfolioCard symbol="M" name="MA" amount={492.62} value={491.24} change={-0.28} color='red'/>

      <Text style={styles.heading}>Featured Tokens</Text>
      <FeaturedTokenCard symbol="BTC" name="Bitcoin" value="66,729.90" change={5.2} color='orange'/>
      <FeaturedTokenCard symbol="SOL" name="Solana" value="227.80" change={3.8} color='skyblue'/>
       <FeaturedTokenCard symbol="Ethereum" name="ETH" value="351.80" change={1.2} color='purple'/>

     
      </ScrollView>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  heading: { color: '#fff', fontWeight: 'bold', marginVertical: 12 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
});
