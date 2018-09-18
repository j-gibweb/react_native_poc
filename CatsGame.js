import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image
} from "react-native";

export default class Cell extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.resetGame()}>
        <View style={styles.container}>
          <View style={styles.whiteBox}>
            <Text style={{ fontSize: 45 }}>Cats Game!</Text>
            <Text style={{ fontSize: 35 }}>click to play again</Text>
            <Image
              style={{ width: 300, height: 200 }}
              source={{uri: "https://media.giphy.com/media/26FPCXdkvDbKBbgOI/giphy.gif"}}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  whiteBox: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 45
  }
});
