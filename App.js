import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useAuth, AuthProvider } from './src/context/AuthContext';
import { WalletProvider } from './src/context/WalletContext';
import BottomNavigator from './src/BottomNavigator';
import LoginScreen from './src/screens/LoginScreen';
//import BottomNavigator from './src/BottomNavigator ';

export default function App() {
  return (
    <AuthProvider>
      {/* <WalletProvider> */}
    <NavigationContainer>
       <RootNavigator />
    </NavigationContainer>
    {/* </WalletProvider> */}
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user } = useAuth();

  return user ? <BottomNavigator /> : <LoginScreen />;
}