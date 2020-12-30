import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from "react-native";

import { examples, emptySample } from "./sampleSudoku.js";
import { findEmptyCase, checkRowsColsSquares } from "./sudoku.js";

export default function App() {
  const [nums, setNums] = useState(emptySample);

  const extractGridValues = () => {
    let gameGrid = [];
    for (var i = 0; i < 9; i++) {
      gameGrid.push([]);
    }
    for (var i in nums) {
      let row = Math.floor(i / 9);
      gameGrid[row].push(parseInt(nums[i].value));
    }
    return gameGrid;
  };

  const checkWin = () => {
    let gameGrid = extractGridValues();
    let gameWon = checkRowsColsSquares(gameGrid);
  };

  const incrementUp = (id) => {
    requestAnimationFrame(() => {
      setNums(([...prevNums]) => {
        const found = prevNums.find((element) => element.id === id);
        found.value = (found.value + 1) % 10;
        return prevNums;
      });
    });
  };
  const newGame = () => {
    setNums(([...prevNums]) => {
      for (var i in prevNums) {
        prevNums[i].value = 0;
      }
      return prevNums;
    });
  };
  console.log("hi333");
  console.log(examples.length);
  console.log(examples[1]);

  const sample = () => {
    setNums(([...prevNums]) => {
      let seed = Math.floor(Math.random() * examples.length);
      // console.log(seed);
      // console.log(examples[seed]);
      for (var i in prevNums) {
        prevNums[i].value = examples[seed][i];
      }
      return prevNums;
    });
  };

  //Start
  const oneDtoTwoD = (array) => {
    let twoDArray = [];
    for (var i = 0; i < 9; i++) {
      twoDArray.push([]);
      for (var j = 0; j < 9; j++) {
        twoDArray[i].push(array[i * 9 + j]);
      }
    }
    return twoDArray;
  };

  const findEmptyCase = (array) => {
    for (let i in array) {
      for (let j in array[0]) {
        if (array[i][j] == 0) {
          return [parseInt(i), parseInt(j)];
        }
      }
    }
    return [-1, -1];
  };

  const validNumber = (grid, value, emptyCase) => {
    // check row
    for (var i = 0; i < 9; i++) {
      if (grid[emptyCase[0]][i] == value && emptyCase[1] != i) {
        return false;
      }
    }
    // check col
    for (var i = 0; i < 9; i++) {
      if (grid[i][emptyCase[1]] == value && emptyCase[0] != i) {
        return false;
      }
    }
    let squareX = Math.floor(emptyCase[1] / 3);
    let squareY = Math.floor(emptyCase[0] / 3);
    // check square
    for (var i = squareY * 3; i < squareY * 3 + 3; i++) {
      for (var j = squareX * 3; j < squareX * 3 + 3; j++) {
        if (grid[i][j] == value && emptyCase != [i, j]) {
          return false;
        }
      }
    }
    return true;
  };
  var animation = [];
  const showChange = (value, row, col) => {
    animation.push([row, col, value]);
  };
  const solveSudoku = (grid) => {
    var emptyCase = findEmptyCase(grid);
    if (emptyCase[0] === -1) {
      return true;
    }
    var row = emptyCase[0];
    var col = emptyCase[1];
    for (var i = 1; i < 10; i++) {
      if (validNumber(grid, i, emptyCase)) {
        for (var k = 1; k <= i; k++) {
          showChange(k, row, col);
        }

        grid[row][col] = i;

        if (solveSudoku(grid)) {
          return true;
        }
        showChange(0, row, col);
        grid[row][col] = 0;
      }
    }
    return false;
  };

  const animate = () => {
    let first = animation[0];
    setNums(([...prevNums]) => {
      prevNums[first[0] * 9 + first[1]].value = first[2];
      return prevNums;
    });
    animation.shift();
  };

  const solve = (instant) => {
    requestAnimationFrame(() => {
      animation = [];
      let gameGrid = [];
      for (var i in nums) {
        gameGrid.push(parseInt(nums[i].value));
      }
      let gameGridTwoD = oneDtoTwoD(gameGrid);

      solveSudoku(gameGridTwoD);
      if (!instant) {
        var idInterval = setInterval(() => {
          animate();
          if (animation.length == 0) {
            clearInterval(idInterval);
          }
        }, 50);
      } else {
        setNums(([...prevNums]) => {
          for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
              prevNums[i * 9 + j].value = gameGridTwoD[i][j];
            }
          }
          return prevNums;
        });
      }
    });
  };
  return (
    // Parent View
    <View style={styles.container}>
      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Sudoku Solver v1.0</Text>
      </View>
      {/* Sudoku Grid Container */}
      <View style={styles.gridContainer}>
        <View style={styles.horizontalSeparatorTop} />
        <View style={styles.horizontalSeparatorBot} />
        <View style={styles.verticalSeparatorLeft} />
        <View style={styles.verticalSeparatorRight} />
        <FlatList
          style={styles.flatListGrid}
          data={nums}
          numColumns={9}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => incrementUp(item.id)}>
              <View style={styles.case}>
                <Text style={ifZeroBlank(item.value)}>{item.value}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* Menu Buttons Container */}
      <View style={styles.menuButtonsContainer}>
        <TouchableOpacity onPress={() => newGame()}>
          <View style={styles.menuButtons}>
            <Text style={styles.menuButtonText}>Empty Board</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sample()}>
          <View style={styles.menuButtons}>
            <Text style={styles.menuButtonText}>New Game</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Menu Buttons Container 2 */}
      <View style={styles.menuButtonsContainer}>
        <TouchableOpacity onPress={() => solve(true)}>
          <View style={styles.menuButtons}>
            <Text style={styles.menuButtonText}>Instant Solve</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => solve(false)}>
          <View style={styles.menuButtons}>
            <Text style={styles.menuButtonText}>Solve</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Draw Grid Separators*/}
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ifZeroBlank = (value) => {
  if (value == 0) {
    return {
      fontSize: 0,
    };
  } else {
    return {
      color: "black",
      fontSize: 32,
    };
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  titleContainer: {
    width: windowWidth,
    height: windowWidth * 0.2,
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
  },
  menuButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: windowWidth,
    // backgroundColor: "blue",
    paddingTop: windowHeight * 0.025,
  },
  case: {
    borderRadius: windowWidth * 0.02,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    margin: windowWidth * 0.0105,
  },
  num: {
    color: "black",
    fontSize: 32,
  },
  gridContainer: {
    width: windowWidth,
    height: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
  },
  flatListGrid: {
    // backgroundColor: "black",
  },
  menuButtons: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    width: windowWidth / 3,
    backgroundColor: "#b5179e",
  },
  menuButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalSeparatorTop: {
    position: "absolute",
    top: windowWidth * 0.331,
    backgroundColor: "lightgrey",
    width: windowWidth * 0.95,
    height: 1.5,
  },
  horizontalSeparatorBot: {
    position: "absolute",
    top: windowWidth * 0.663,
    backgroundColor: "lightgrey",
    width: windowWidth * 0.95,
    height: 1.5,
  },
  verticalSeparatorLeft: {
    position: "absolute",
    top: windowWidth * 0.025,
    left: windowWidth * 0.333,
    backgroundColor: "lightgrey",
    width: 1.5,
    height: windowWidth * 0.95,
  },
  verticalSeparatorRight: {
    position: "absolute",
    top: windowWidth * 0.025,
    left: windowWidth * 0.664,
    backgroundColor: "lightgrey",
    width: 1.5,
    height: windowWidth * 0.95,
  },
});
