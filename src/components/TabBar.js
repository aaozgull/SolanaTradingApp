import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TabBar({ activeTab, setActiveTab, tabs = [] }) {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'skyblue',
  },
  inactiveTab: {
    backgroundColor: '#1E1E1E',
  },
  tabText: {
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'black',
  },
  inactiveTabText: {
    color: '#aaa',
  },
});
