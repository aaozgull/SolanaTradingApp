import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useAuth, AuthProvider } from './src/context/AuthContext';
import { TokenProvider } from './src/context/TokenContext';
import { WalletProvider } from './src/context/WalletContext';
import BottomNavigator from './src/navigations/BottomNavigator';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
//import BottomNavigator from './src/BottomNavigator ';

export default function App() {
  return (
    <AuthProvider>
      {/* <WalletProvider> */}
      <TokenProvider>
    <NavigationContainer>
       <RootNavigator />
    </NavigationContainer>
    </TokenProvider>
    {/* </WalletProvider> */}
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user } = useAuth();

  return user ? <BottomNavigator /> : <LoginScreen />;}