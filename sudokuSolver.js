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

const findEmptyCase = (array) => {
  for (let i in array) {
    if (array[i] == 0) {
      return i;
    }
  }
  return -1;
};

const checkLine = (array, position) => {
  for (var i = 0; i < 9; i++) {
    if (array[position] == array[i] && i != position) {
      return false;
    }
  }
  return true;
};
export const checkCase = (array, caseToCheck) => {
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

  let goodRow = checkLine(caseRow, column);
  let goodCol = checkLine(caseColumn, row);
  let goodSquare = checkLine(caseSquare, (row % 3) * 3 + (column % 3));

  if (goodRow && goodCol && goodSquare) {
    return true;
  } else {
    return false;
  }
};
let currentEmptyCase = findEmptyCase(sampleSudoku);

const sudokuSolve = (array) => {
  let emptyCase = findEmptyCase(array);
  if (emptyCase == -1) {
    return true;
  }

  for (var i = 1; i < 10; i++) {
    let arrayCopy = [...array];
    arrayCopy[emptyCase] = i;
    if (checkCase(arrayCopy, emptyCase)) {
      array[emptyCase] = i;
      if (sudokuSolve(array)) {
        return true;
      }
      array[emptyCase] = 0;
    }
  }
  return false;
};

sudokuSolve(sampleSudoku);

console.log(sampleSudoku);
