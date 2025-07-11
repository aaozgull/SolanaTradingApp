import React from 'react';
import { View, TextInput, StyleSheet,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function SearchBar({ query, setQuery }) {
  return (
    <View style={styles.container}>
       <Image 
        source={require('../assets/icons/search.png')}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search tokens..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginHorizontal:16
  },
  input: {
    flex: 1,
    color: '#FFF',
    paddingVertical: 12,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '#FFF',
    marginRight: 8,
  },
});
