import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

const Tile = ({ type, data }) => {
  const [mean, setMean] = useState(0);
  const [median, setMedian] = useState(0);
  const [mode, setMode] = useState(0);

  useEffect(() => {
    findMean()
    findMedian()
    findMode()
  }, [data])

  const findMean = () => {
    const result = data.reduce((a, b) => parseInt(a) + parseInt(b), 0) / data.length;
    setMean(result);
  }

  const findMedian = () => {
    const sortedData = data.sort((a, b) => a - b);
    const length = sortedData.length;
    const index = length % 2 === 0 ? length / 2 : Math.ceil(length / 2);
    setMedian(data[index - 1]);
  }

  const findMode = () => {
    let mode;
    let modeObj = {};
    let highestValue = 0;
    let highestValueKey;

    data.forEach(num => {
      if (!modeObj[num]) {
        modeObj[num] = 1;
      } else {
        modeObj[num] += 1
      }
    });
    for (let key in modeObj) {
      const value = modeObj[key];
      if (value > highestValue) {
        highestValue = value;
        highestValueKey = key;
      }
    }
    mode = Number(highestValueKey);
    setMode(mode);
  }

  return (
    <View style={styles.tile}>
      <Text style={styles.typeText}>{type}</Text>
      {type === "mean" && (<Text style={styles.dataText}>{mean}</Text>)}
      {type === "median" && (<Text style={styles.dataText}>{median}</Text>)}
      {type === "mode" && (<Text style={styles.dataText}>{mode}</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 150,
    borderWidth: 1,
    margin: 10,
    borderColor: 'black',
    backgroundColor: 'dodgerblue'
  },
  typeText: {
    color: 'white',
    fontSize: 26,
    margin: 10
  },
  dataText: {
    fontSize: 20,
  }
})

export default Tile;