import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { decorator as sensors } from "react-native-sensors";
import { Accelerometer, Gyroscope } from "react-native-sensors";
// import clamp from "clamp"



const clamp = (val, low, high) => {
  if (val < low) return low
  if (val > high) return high
  return val
}

const neutralData = {
  x: 0,
  y: 0
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { ...neutralData };
  }

  componentDidMount() {
    this.startGameEventListener();
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  startGameEventListener() {
    this.subscription = this.props.data
      .startWith(neutralData)
      .scan(
        (acc, value) => ({ x: acc.x - value.x, y: acc.y + value.y }),
        neutralData
      )
      .subscribe(({ x, y }) => {
        this.setState({ 
          x: clamp(x * -3, 0, 150),
          y: clamp(y * -3, 0, 150), 
        });
      });
  }

  render() {
    const { x, y } = this.state

    return (
      <View style={styles.Table}>
        <Text>
          {/* {JSON.stringify(this.state)} */}
        </Text>
        <View style={[styles.Ball, {left: x, top: y}]}></View>
      </View>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      observable: null,
      error: null
    };

    new Accelerometer({
      updateInterval: 16
    })
    .then(observable => {
      this.setState({ observable });
    })
    .catch(error => {
      this.setState({ error: "The sensor is not available" });
    });
  }

  render() {
    const { error, observable } = this.state;

    if (error) {
      return (
        <View style={styles.container}>
          <Text>{error}</Text>
        </View>
      );
    }

    if (!observable) {
      return (
        <View style={styles.container}>
          <Text>Loading Sensor</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Game data={observable} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  Table: {
    width: 150,
    height: 150,
    backgroundColor: 'salmon'
  },
  Ball: {
    width: 20,
    height: 20,
    borderRadius: 100/2,
    backgroundColor: 'black',
    position: 'absolute',
    // left: 50,
    // top: 50
  }
});

export default App;

// export default sensors({
//   Accelerometer: {
//     updateInterval: 300 // optional
//   },
//   Gyroscope: true
// })(App);
