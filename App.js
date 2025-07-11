import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { AuthProvider } from './src/context/AuthContext';
import { WalletProvider } from './src/context/WalletContext';
import BottomNavigator from './src/BottomNavigator';
//import BottomNavigator from './src/BottomNavigator ';

export default function App() {
  return (
    <AuthProvider>
      {/* <WalletProvider> */}
    <NavigationContainer>
      <BottomNavigator/>
    </NavigationContainer>
    {/* </WalletProvider> */}
    </AuthProvider>
  );
}