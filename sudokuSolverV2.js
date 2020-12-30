let sampleSudoku = [
  0,
  0,
  0,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  3,
  0,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  6,
  0,
  0,
  0,
  5,
  0,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  1,
  8,
  0,
  0,
  0,
  0,
  8,
  1,
  0,
  0,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  0,
  5,
  0,
  0,
  4,
  0,
  0,
  0,
  0,
  3,
  0,
  0,
];

const oneDtoTwoD = (array) => {
  twoDArray = [];
  for (var i = 0; i < 9; i++) {
    twoDArray.push([]);
    for (var j = 0; j < 9; j++) {
      twoDArray[i].push(array[i * 9 + j]);
    }
  }
  return twoDArray;
};

let gameGrid = oneDtoTwoD(sampleSudoku);

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

validNumber = (grid, value, emptyCase) => {
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
  squareRow = Math.floor(emptyCase[0] / 3);
  squareCol = Math.floor(emptyCase[1] / 3);
  // check square
  for (var i = squareCol * 3; i < squareCol + 3; i++) {
    for (var j = squareRow * 3; j < squareRow + 3; j++) {
      if (grid[i][j] == value && emptyCase != [i, j]) {
        return false;
      }
    }
  }
  return true;
};

solve = (grid) => {
  emptyCase = findEmptyCase(grid);
  if (emptyCase[0] === -1) {
    return true;
  }
  var row = emptyCase[0];
  var col = emptyCase[1];
  for (var i = 1; i < 10; i++) {
    if (validNumber(grid, i, emptyCase)) {
      grid[row][col] = i;

      if (solve(grid)) {
        return true;
      }
      grid[row][col] = 0;
    }
  }
  return false;
};

solve(gameGrid);

console.log(gameGrid);
