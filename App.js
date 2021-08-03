import React, { useState } from 'react';
import { View, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Tile from './Tile';

const App = () => {
  const [data, setData] = useState([]);
  const [mean, setMean] = useState(10);
  const [median, setMedian] = useState(20);
  const [mode, setMode] = useState(30);
  const [dataset, setDataset] = useState(true)
  const [number, onChangeNumber] = useState(0);

  const getDataSet = async () => {
    if (dataset) {
      const res = await fetch('http://localhost:3000/1234'); // true
      const data = await res.json();
      setData(data);
    } else {
      const res = await fetch('http://localhost:3000/4321'); // false
      const data = await res.json();
      setData(data)
    }
    setDataset(!dataset);
  }

  const addToDataset = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => getDataSet()} style={styles.button}>
        <Text style={styles.buttonText}>select new dataset</Text>
      </TouchableOpacity>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <Button title="submit" onPress={() => console.log("submitted")} />
      </View>

      <View>
        <Tile data={mean} type="Mean" />
        <Tile data={median} type="Median" />
        <Tile data={mode} type="Mode" />
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 122,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    margin: 12,
    backgroundColor: '#ccc'
  },
  buttonText: {
    fontSize: 20,
  }
});

export default App;