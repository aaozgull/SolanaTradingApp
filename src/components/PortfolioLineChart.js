import React,{useState, useEffect} from 'react';
import { View } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default function PortfolioLineChart() {
    const [portfolioData, setPortfolioData] = useState([]);
    useEffect(() => {
  // Example static data — replace with your fetch call
  setPortfolioData([50, 60, 55, 70, 80, 75, 90]);
}, []);
  return (
    <View style={{ height: 200, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
      <LineChart
        style={{ flex: 1 }}
        data={portfolioData}
        svg={{ stroke: '#00FF00', strokeWidth: 2 }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
      >
        <Grid svg={{ stroke: '#333' }} />
      </LineChart>
    </View>
  );
}
