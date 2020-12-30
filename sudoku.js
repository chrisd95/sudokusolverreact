import { examples } from "./sampleSudoku";

export const checkLine = (array) => {
  let hasOne = array.includes(1);
  let hasTwo = array.includes(2);
  let hasThree = array.includes(3);
  let hasFour = array.includes(4);
  let hasFive = array.includes(5);
  let hasSix = array.includes(6);
  let hasSeven = array.includes(7);
  let hasEight = array.includes(8);
  let hasNine = array.includes(9);
  if (
    hasOne &&
    hasTwo &&
    hasThree &&
    hasFour &&
    hasFive &&
    hasSix &&
    hasSeven &&
    hasEight &&
    hasNine
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkRowsColsSquares = (array) => {
  let rowsGood = true;
  let colsGood = true;
  // This checks rows
  for (var row in array) {
    if (!checkLine(array[row])) {
      rowsGood = false;
      break;
    }
    // This checks columns
    let arrayCol = [];
    for (var col in array[0]) {
      arrayCol.push(array[col][row]);
    }

    if (!checkLine(arrayCol)) {
      colsGood = false;
      break;
    }
  }
  let squaresGood = true;
  for (var bigRows = 0; bigRows < 3; bigRows++) {
    let leftSquare = array[bigRows * 3]
      .slice(0, 3)
      .concat(
        array[bigRows * 3 + 1]
          .slice(0, 3)
          .concat(array[bigRows * 3 + 2].slice(0, 3))
      );
    let middleSquare = array[bigRows * 3]
      .slice(3, 6)
      .concat(
        array[bigRows * 3 + 1]
          .slice(3, 6)
          .concat(array[bigRows * 3 + 2].slice(3, 6))
      );
    let rightSquare = array[bigRows * 3]
      .slice(6, 9)
      .concat(
        array[bigRows * 3 + 1]
          .slice(6, 9)
          .concat(array[bigRows * 3 + 2].slice(6, 9))
      );
    if (
      !checkLine(leftSquare) ||
      !checkLine(middleSquare) ||
      !checkLine(rightSquare)
    ) {
      squaresGood = false;
      break;
    }
  }

  return rowsGood && colsGood && squaresGood;
};

export const findEmptyCase = (array) => {
  for (let i in array) {
    if (array[i] == 0) {
      return i;
    }
  }
  return "no empty case";
};

export const checkCase = (array, currentCase) => {
  let rowsGood = true;
  let colsGood = true;
  // This checks rows
  for (var row in array) {
    if (!checkLine(array[row])) {
      rowsGood = false;
      break;
    }
    // This checks columns
    let arrayCol = [];
    for (var col in array[0]) {
      arrayCol.push(array[col][row]);
    }

    if (!checkLine(arrayCol)) {
      colsGood = false;
      break;
    }
  }
  let squaresGood = true;
  for (var bigRows = 0; bigRows < 3; bigRows++) {
    let leftSquare = array[bigRows * 3]
      .slice(0, 3)
      .concat(
        array[bigRows * 3 + 1]
          .slice(0, 3)
          .concat(array[bigRows * 3 + 2].slice(0, 3))
      );
    let middleSquare = array[bigRows * 3]
      .slice(3, 6)
      .concat(
        array[bigRows * 3 + 1]
          .slice(3, 6)
          .concat(array[bigRows * 3 + 2].slice(3, 6))
      );
    let rightSquare = array[bigRows * 3]
      .slice(6, 9)
      .concat(
        array[bigRows * 3 + 1]
          .slice(6, 9)
          .concat(array[bigRows * 3 + 2].slice(6, 9))
      );
    if (
      !checkLine(leftSquare) ||
      !checkLine(middleSquare) ||
      !checkLine(rightSquare)
    ) {
      squaresGood = false;
      break;
    }
  }
};

export const checkCaseSolve = (array, caseToCheck) => {
  row = Math.floor(caseToCheck / 9);
  rowStart = row * 9;
  rowEnd = rowStart + 9;
  let caseRow = array.slice(rowStart, rowEnd);
  let column = caseToCheck % 9;
  let caseColumn = [];
  for (var i = 0; i < 9; i++) {
    caseColumn.push(array[column + i * 9]);
  }
  let caseSquare = [];
  let squareRow = Math.floor(row / 3);
  let squareCol = Math.floor(column / 3);
  let squareBeginning = squareRow * 27 + squareCol * 3;
  for (var i = 0; i < 3; i++) {
    caseSquare.push(array[squareBeginning + 9 * i]);
    caseSquare.push(array[squareBeginning + 1 + 9 * i]);
    caseSquare.push(array[squareBeginning + 2 + 9 * i]);
  }

  let goodRow = checkLineSolve(caseRow, column);
  let goodCol = checkLineSolve(caseColumn, row);
  let goodSquare = checkLineSolve(caseSquare, (row % 3) * 3 + (column % 3));

  if (goodRow && goodCol && goodSquare) {
    return true;
  } else {
    return false;
  }
};

export const checkLineSolve = (array, position) => {
  for (var i = 0; i < 9; i++) {
    if (array[position] == array[i] && i != position) {
      return false;
    }
  }
  return true;
};

export const sudokuSolve = (array) => {
  let emptyCase = findEmptyCase(array);
  if (emptyCase == -1) {
    return true;
  }

  for (var i = 1; i < 10; i++) {
    let arrayCopy = [...array];
    arrayCopy[emptyCase] = i;
    if (checkCaseSolve(arrayCopy, emptyCase)) {
      array[emptyCase] = i;
      if (sudokuSolve(array)) {
        return true;
      }
      array[emptyCase] = 0;
    }
  }
  return false;
};
