// src/navigation/AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TokenDetailScreen from '../screens/TokenDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
     

    <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Stack.Screen name="TokenList" component={TokenListScreen} /> */}
            <Stack.Screen name="TokenDetail" component={TokenDetailScreen} />
          </Stack.Navigator>
  );
}
