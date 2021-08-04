import React, { useEffect, useState } from 'react';
import { View, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Tile from './Tile';

const App = () => {
  const [data, setData] = useState([]);
  const [mean, setMean] = useState(0);
  const [median, setMedian] = useState(0);
  const [mode, setMode] = useState(0);
  const [dataset, setDataset] = useState("1234");
  const [number, onChangeNumber] = useState("");

  const fetchInitial = async () => {
    try {
      const res = await fetch(`http://localhost:3000/datasets/${dataset}`);
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      console.log("error! ", err)
    }
  }

  useEffect(() => {
    fetchInitial();
  }, [])

  const toggleDataSet = async () => {
    onChangeNumber("")
    let newDataset = dataset === "1234" ? "4321" : "1234";
    setDataset(newDataset);

    try {
      const res = await fetch(`http://localhost:3000/datasets/${newDataset}`);
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      console.log("error! ", err)
    }
  }

  const addToDataset = async (num) => {
    data.push(num);
    const settings = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data }),
    };
    try {
      const fetchResponse = await fetch(`http://localhost:3000/datasets/${dataset}`, settings);
      const json = await fetchResponse.json();
      setData(json.data);
      onChangeNumber("")
    } catch (err) {
      console.log("error! ", err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => toggleDataSet()} style={styles.button}>
        <Text style={styles.buttonText}>select new dataset</Text>
      </TouchableOpacity>
      <Text>current dataset: {dataset}</Text>
      <Text>dataset length is: {data.length}</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Add number to dataset"
          keyboardType="numeric"
        />
        <Button title="submit" onPress={() => addToDataset(number)} />
      </View>

      <View>
        <Tile data={data} type="mean" />
        <Tile data={data} type="median" />
        <Tile data={data} type="mode" />
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
    width: 172,
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