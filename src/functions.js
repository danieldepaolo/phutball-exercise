import { rows, cols } from './constants';

export const getDefaultBoard = () => {
  const board = [];
  for (let i = 0; i < rows; ++i) {
    board.push(new Array(cols).fill(null));
  }

  return board;
};

// Given a board and ball position, evaluate ball move options
// Also get men that would be removed in such a case
export const getBallMoveOptions = (ballPosition, board) => {
  let ballOptions = [];
  let toRemove = [];

  // Try up
  let r = ballPosition.r-1;
  let sawMan = false;
  while (r >= 0 && board[r][ballPosition.c] === 'man') {
    if (board[r][ballPosition.c] === 'man') {
      toRemove.push({r: r, c: ballPosition.c});
      sawMan = true;
    }
    r--;
  }
  if (sawMan && r >= 0) {
    ballOptions.push({r: r, c: ballPosition.c, toRemove: toRemove});
  }

  // Try down
  r = ballPosition.r+1;
  sawMan = false;
  toRemove = [];
  while (r < rows && board[r][ballPosition.c] === 'man') {
    if (board[r][ballPosition.c] === 'man') {
      toRemove.push({r: r, c: ballPosition.c});
      sawMan = true;
    }
    r++;
  }
  if (sawMan && r < rows) {
    ballOptions.push({r: r, c: ballPosition.c, toRemove: toRemove});
  }

  // Try left
  let c = ballPosition.c-1;
  sawMan = false;
  toRemove = [];
  while (c >= 0 && board[ballPosition.r][c] === 'man') {
    if (board[ballPosition.r][c] === 'man') {
      toRemove.push({r: ballPosition.r, c: c});
      sawMan = true;
    }
    c--;
  }
  if (sawMan && c >= 0) {
    ballOptions.push({r: ballPosition.r, c: c, toRemove: toRemove});
  }

  // Try right
  c = ballPosition.c+1;
  sawMan = false;
  toRemove = [];
  while (c < cols && board[ballPosition.r][c] === 'man') {
    if (board[ballPosition.r][c] === 'man') {
      toRemove.push({r: ballPosition.r, c: c});
      sawMan = true;
    }
    c++;
  }
  if (sawMan && c < cols) {
    ballOptions.push({r: ballPosition.r, c: c, toRemove: toRemove});
  }

  /* Diagonals */

  // Try up-left
  r = ballPosition.r-1;
  c = ballPosition.c-1;
  sawMan = false;
  toRemove = [];
  while (c >= 0 && r >= 0 && board[r][c] === 'man') {
    if (board[r][c] === 'man') {
      toRemove.push({r: r, c: c});
      sawMan = true;
    }
    r--;
    c--;
  }
  if (sawMan && c >= 0 && r >= 0) {
    ballOptions.push({r: r, c: c, toRemove: toRemove});
  }

  // Try up-right
  r = ballPosition.r-1;
  c = ballPosition.c+1;
  sawMan = false;
  toRemove = [];
  while (c < cols && r >= 0 && board[r][c] === 'man') {
    if (board[r][c] === 'man') {
      toRemove.push({r: r, c: c});
      sawMan = true;
    }
    r--;
    c++;
  }
  if (sawMan && c < cols && r >= 0) {
    ballOptions.push({r: r, c: c, toRemove: toRemove});
  }

  // Try down-left
  r = ballPosition.r+1;
  c = ballPosition.c-1;
  sawMan = false;
  toRemove = [];
  while (c >= 0 && r < rows && board[r][c] === 'man') {
    if (board[r][c] === 'man') {
      toRemove.push({r: r, c: c});
      sawMan = true;
    }
    r++;
    c--;
  }
  if (sawMan && c >= 0 && r < rows) {
    ballOptions.push({r: r, c: c, toRemove: toRemove});
  }

  // Try down-right
  r = ballPosition.r+1;
  c = ballPosition.c+1;
  sawMan = false;
  toRemove = [];
  while (c < cols && r < rows && board[r][c] === 'man') {
    if (board[r][c] === 'man') {
      toRemove.push({r: r, c: c});
      sawMan = true;
    }
    r++;
    c++;
  }
  if (sawMan && c < cols && r < rows) {
    ballOptions.push({r: r, c: c, toRemove: toRemove});
  }

  return ballOptions;
}
