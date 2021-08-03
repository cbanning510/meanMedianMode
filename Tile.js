import React from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

const Tile = ({ type, data }) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.typeText}>{type}</Text>
      <Text style={styles.dataText}>{data}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tile: {
    //flex: 1,
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