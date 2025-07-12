import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PrivyProvider ,usePrivy} from '@privy-io/expo';
//import { privy } from './src/lib/privyClient';
import BottomNavigator from './src/navigations/BottomNavigator';
import LoginScreen from './src/screens/LoginScreen';
import { TokenProvider } from './src/context/TokenContext';
import { PRIVY_APP_ID, PRIVY_ClIENT_ID } from './src/Utils/Config';
//import BottomNavigator from './src/BottomNavigator ';

export default function App() {
  return (  
    <PrivyProvider
      appId={PRIVY_APP_ID}
      clientId={PRIVY_ClIENT_ID}
    >
    
      <TokenProvider>
    <NavigationContainer>
       <RootNavigator />
    </NavigationContainer>
    </TokenProvider>
    
    </PrivyProvider>
  );
}



function RootNavigator() {
  const { user, isReady } = usePrivy();

  if (!isReady) return null; // or your Loading screen

  return user ? <BottomNavigator /> : <LoginScreen />;
}
