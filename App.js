import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { AuthProvider } from './src/context/AuthContext';
import { WalletProvider } from './src/context/WalletContext';
import AppNavigator from './src/AppNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      {/* <WalletProvider> */}
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    {/* </WalletProvider> */}
    </AuthProvider>
  );
}