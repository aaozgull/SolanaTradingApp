import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NumberInputWithStepper({ label, value, setValue,isVisible=false, min = 0 }) {
    const [isFocused, setIsFocused] = useState(false);
  const increment = () => {
    setValue((prev) => (Number(prev) + 1).toString());
  };

  const decrement = () => {
    // setValue((prev) => {
    //   const newValue = Number(prev) - 1;
    //   return newValue >= min ? newValue.toString() : min.toString();
    // });
      setValue((prev) => (Number(prev) - 1).toString());
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
        <View
        style={[
          styles.inputRow,
          { borderWidth: 2, borderColor: isFocused ? 'skyblue' : 'transparent' },
        ]}
      >
        <TextInput
          placeholder={label}
          placeholderTextColor="#888"
          keyboardType={isVisible ? 'numeric' : 'default'}
          value={value}
          onChangeText={setValue}
          style={styles.input}
           onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
       {isVisible && <View style={styles.buttons}>
          <TouchableOpacity onPress={increment} style={styles.button}>
            <Text style={styles.buttonText}>↑</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={decrement} style={styles.button}>
            <Text style={styles.buttonText}>↓</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: { color: '#aaa', marginBottom: 8, marginTop: 20 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    color: '#FFF',
    padding: 12,
  },
  buttons: {
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: '#333',
  },
  button: {
    paddingHorizontal: 12,
   // paddingVertical: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 12,
  },
});
