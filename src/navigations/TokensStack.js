// navigation/TokensStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TokenListScreen from '../screens/TokenListScreen';
import TokenDetailScreen from '../screens/TokenDetailScreen';

const Stack = createNativeStackNavigator();

export default function TokensStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TokenList" component={TokenListScreen} />
      <Stack.Screen name="TokenDetail" component={TokenDetailScreen} />
    </Stack.Navigator>
  );
}
