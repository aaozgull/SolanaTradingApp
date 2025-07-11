import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, Alert } from 'react-native';
import HomeScreen from '../src/screens/HomeScreen';
import TokenDetailScreen from '../src/screens/TokenDetailScreen';

const Tab = createBottomTabNavigator();

function CustomTabBarIcon({ focused, label }) {
  //Alert.alert('lable', label[0])
  return (
    <View style={styles.item}>
      <View style={[styles.iconWrapper, focused ? styles.activeIcon : styles.inactiveIcon]}>
        <Text style={focused ? styles.activeText : styles.inactiveText}>
          {label[0]}
        </Text>
      </View>
      <Text style={[styles.label, focused && styles.activeLabel]}>
        {label}
      </Text>
    </View>
  );
}

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.nav,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
           tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Tokens"
        component={TokenDetailScreen}
        options={{
           tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} label="Tokens" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
    height: 80,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeIcon: {
    backgroundColor: 'skyblue',
  },
  inactiveIcon: {
    backgroundColor: '#1E1E1E',
  },
  activeText: {
    color: 'black',
    fontSize: 12,
  },
  inactiveText: {
    color: 'white',
    fontSize: 12,
  },
  label: {
  fontSize: 12,
  color: '#aaa',
  width: 50, // adjust to fit your longest tab
  textAlign: 'center',
},

  activeLabel: {
    color: 'white',
    //fontWeight: 'bold',
  },
});
