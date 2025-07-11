// src/screens/TokenDetailScreen.js
import React, { useState } from 'react';
import { View,ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getQuote } from '../services/jupiter';
import TabBar from '../components/TabBar';
import PortfolioName from '../components/PortfolioName';
import NumberInputWithStepper from '../components/NumberInputWithStepper';
import ActionButton from '../components/ActionButton';

export default function TokenDetailScreen({ route, navigation }) {
  //const { token } = route.params; // Pass token from HomeScreen
  const [amount, setAmount] = useState('0');
  const [result, setResult] = useState(null);
const [activeTab, setActiveTab] = useState('Buy');
  const handleTrade = async () => {
    try {

     //  Alert.alert('token.mintAddress', token.mintAddress);
      const quote = await getQuote({
        inputMint: 'So11111111111111111111111111111111111111112', // SOL mint address
        //outputMint: token.mintAddress,
        amount: Number(amount) * 1e9, // Convert SOL to lamports
      });
     //Alert.alert('quote', JSON.stringify(quote, null, 2));
      setResult(quote);
      //alert('Trade executed (mock)');
    } catch (err) {
      console.error(err);
      Alert.alert('Trade Error', err?.message || JSON.stringify(err));
    }
  };
   const handleAction = () => {
    Alert.alert(`You pressed: ${activeTab} BTC`);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
              <PortfolioName name='Bitcoin' symbol='BTC' balance={192615.98} change={1764} />
              <View style={{ height: 200, backgroundColor: '#1E1E1E', borderRadius: 12 }} /> 

                
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={['Buy', 'Sell', 'Exchange']}
      />

      {/* Render content based on active tab */}
      {activeTab === 'Buy' && <View>{/* Buy form */}</View>}
      {activeTab === 'Sell' && <View>{/* Sell form */}</View>}
      {activeTab === 'Exchange' && <View>{/* Exchange form */}</View>}
    
     <NumberInputWithStepper
          label="Amount in USD"
          value={amount}
          setValue={setAmount}

          isVisible={true}
      />

      <NumberInputWithStepper
          label="You'll receive"
          value='0.00 BTC'
          setValue={setAmount}
      />

      <ActionButton activeTab={activeTab} onPress={handleAction} />
      {/* <Button title="Execute Trade" onPress={handleTrade} />
      {result && (
        <Text style={styles.result}>Quote: {JSON.stringify(result, null, 2)}</Text>
      )} */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
  <Text style={styles.backArrow}>←</Text>
</TouchableOpacity>

        </View>
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1,  backgroundColor: '#121212',  },
  container: { justifyContent:'center',  padding: 20, marginTop:50 },
  name: { color: '#FFF', fontSize: 24, marginBottom: 10 },
  price: { color: '#FFF', fontSize: 20, marginBottom: 20 },
  input: { backgroundColor: '#1E1E1E', color: '#FFF', padding: 12, borderRadius: 8,},
  result: { color: '#0F0', marginTop: 20 },
  label: { color: '#aaa', marginBottom: 8, marginTop: 20  },
  backButton: {
  position: 'absolute',
  top: 40,          // Adjust for status bar height if needed
  left: 20,
  zIndex: 10,
  backgroundColor: '#1E1E1E',
  borderRadius: 20,
  padding: 8,
},

backArrow: {
  color: '#fff',
  fontSize: 20,
},

});
