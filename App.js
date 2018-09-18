import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

import Cell from "./Cell";
import GameOver from './GameOver'
import CatsGame from './CatsGame'

const areEqual = (a, b, c) => {
  return (
    !!a && a === b && a === c
  )
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: 1,
      grid: Array(9)
        .fill()
        .map(() => ""),
      winner: '',

      
      grid: ["O", "X", "O", "X", "X", "O", "", "O", ""],
      turn: 8,
      // catsGame: false
    };

    this.handlePress = this.handlePress.bind(this);
  }

  resetGame() {
    this.setState({
      turn: 1,
      grid: Array(9)
        .fill()
        .map(() => ""),
      winner: '',
      catsGame: false
    })
  }

  checkForWinner() {
    const { grid } = this.state
    console.log(this.state.turn)
    let winner
    // top row
    if (areEqual(grid[0], grid[1], grid[2])) winner = grid[0]
    // middle row
    if (grid[3] && grid[3] === grid[4] && grid[3] === grid[5]) winner = grid[3]
    // // bottom row
    if (grid[6] && grid[6] === grid[7] && grid[8] === grid[5]) winner = grid[6]
    // // top left to bottom right
    if (grid[0] && grid[0] === grid[4] && grid[0] === grid[8]) winner = grid[0]
    // // top right to bottom left
    if (grid[2] && grid[2] === grid[4] && grid[2] === grid[6]) winner = grid[2]

    if (winner) {
      setTimeout(() => {
        this.setState({ winner })
      }, 500)
    }
    else if (this.state.turn === 10) {
      this.setState({catsGame: true})
    }
    
  }

  handlePress(cell) {
    const { grid, turn } = this.state;

    if (grid[cell]) return;

    grid[cell] = turn % 2 === 0 ? "X" : "O";

    this.setState({ 
      grid, 
      turn: turn + 1
    }, this.checkForWinner);
  }

  render() {
    
    return (
      <View style={styles.container}>
        {Array(9)
          .fill()
          .map((_, i) => {
            return (
              <Cell
                index={i}
                key={i}
                handlePress={this.handlePress}
                styles={[
                  (i + 1) % 3 !== 0 && styles.borderRight,
                  i < 6 && styles.borderBottom
                ]}
                grid={this.state.grid}
              />
            );
          })
        }

        {this.state.winner && (
          <GameOver 
            winner={this.state.winner} 
            resetGame={this.resetGame.bind(this)}
          />
        )}
        {this.state.catsGame && 
          <CatsGame resetGame={this.resetGame.bind(this)} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
    marginHorizontal: 10
  },
  cell: {
    width: "33%",
    height: "33%"
  },
  borderRight: { 
    borderRightColor: "black", 
    borderRightWidth: 5 
  },
  borderBottom: { 
    borderBottomColor: "black", 
    borderBottomWidth: 5 
  },
});

export default App;
