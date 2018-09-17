import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

export default class Cell extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { handlePress, styles, grid, index } = this.props
    const mark = grid[index];
    return (
      <TouchableWithoutFeedback onPress={() => handlePress(index) }>
        <View style={[styleSheet.cell, ...styles]}>
          <Text 
            style={{
              fontSize: 70,
              color: (mark === "X" ? "red" : "black")
            }}
          >
            {mark}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
};

const styleSheet = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    height: "33%",
  }
});
