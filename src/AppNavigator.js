// src/navigation/AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import TokenListScreen from '../src/screens/TokenListScreen';
import TokenDetailScreen from '../src/screens/TokenDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
     

    <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TokenList" component={TokenListScreen} />
            <Stack.Screen name="TokenDetail" component={TokenDetailScreen} />
          </Stack.Navigator>
  );
}
