import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

export default class Cell extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    
    return (
      <TouchableWithoutFeedback 
        onPress={() => this.props.resetGame() }
      >
        <View style={styles.container}>
          <View style={styles.whiteBox}>
            <Text style={{fontSize: 45}}>the winner is {this.props.winner}</Text>
            <Text style={{fontSize: 35}}>
              click to play again
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  whiteBox: {
    backgroundColor: "white",
  },
  message: {
    fontSize: 45
  }
});
