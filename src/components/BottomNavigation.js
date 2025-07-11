import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BottomNavigation({ navigation, activeTab }) {
  return (
    <View style={styles.nav}>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Home')}>
        <View style={styles.iconWrapper}>
          <Text style={activeTab === 'Home' ? styles.active : styles.inactive}>H</Text>
        </View>
        <Text style={[styles.label, activeTab === 'Home' && styles.activeLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TokenDetail')}>
        <View style={styles.iconWrapper}>
          <Text style={activeTab === 'TokenDetail' ? styles.active : styles.inactive}>T</Text>
        </View>
        <Text style={[styles.label, activeTab === 'TokenDetail' && styles.activeLabel]}>Tokens</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    borderTopWidth:1,
    borderTopColor:'#1E1E1E',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#121212',
    paddingBottom: 10,
  },
  item: {
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  active: {
    fontSize: 12,
    color: 'black',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'skyblue',
    textAlign: 'center',
    lineHeight: 30,
  },
  inactive: {
    fontSize: 12,
    color: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1E1E1E',
    textAlign: 'center',
    lineHeight: 30,
  },
  label: {
    color: '#aaa',
    fontSize: 12,
  },
  activeLabel: {
    color: 'skyblue', // ✅ Highlight active tab label
    fontWeight: 'bold',
  },
});
