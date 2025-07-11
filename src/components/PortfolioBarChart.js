// src/components/PortfolioBarChart.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export default function PortfolioBarChart() {
  const barData = [
    { value: 50, label: 'BTC' },
    { value: 80, label: 'SOL' },
    { value: 40, label: 'ETH' },
  ];

  return (
    <View style={styles.container}>
      <BarChart
        barWidth={40}
        barBorderRadius={4}
        frontColor="skyblue"
        data={barData}
        yAxisLabelSuffix="%"
        xAxisLabelTextStyle={{ color: '#fff' }}
        yAxisTextStyle={{ color: '#fff' }}
        yAxisLabelWidth={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
});
