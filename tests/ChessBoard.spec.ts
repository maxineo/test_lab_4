import { Bishop } from "../classes/Bishop";
import { ChessBoard } from "../classes/ChessBoard"
import { Pawn } from "../classes/Pawn";
import { ChessmanColor } from "../enums/ChessmanColor";

test('Test board getFieldByPosition', () => {

  const board = new ChessBoard();

  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      const field = board.getFieldByPosition(row, column);

      expect(field).not.toBe(null);
      expect(field?.row).toBe(row);
      expect(field?.column).toBe(column);
    }
  };

  expect(board.getFieldByPosition(8, 8)).toBe(null);
  expect(board.getFieldByPosition(10, 10)).toBe(null);
  expect(board.getFieldByPosition(50, 50)).toBe(null);
  expect(board.getFieldByPosition(-10, -10)).toBe(null);
});

test('Test board setChessmanAtPosition', () => {

  const board = new ChessBoard();

  const pawnRow = 1;
  const pawnColumn = 1;

  const pawn = new Pawn({
    row: pawnRow,
    column: pawnColumn,
    color: ChessmanColor.White,
  });

  board.setChessmanAtPosition(pawnRow, pawnColumn, pawn);
  const boardPawn = board.getFieldByPosition(pawnRow, pawnColumn)?.chessman;
  expect(boardPawn).not.toBe(null);
  expect(boardPawn).not.toBe(undefined);

  // Test incorrect position
  const bishopRow = 10;
  const bishopColumn = 10;

  const bishop = new Bishop({
    row: bishopRow,
    column: bishopColumn,
    color: ChessmanColor.White,
  });

  board.setChessmanAtPosition(bishopRow, bishopColumn, bishop);
  const boardBishop = board.getFieldByPosition(bishopRow, bishopColumn)?.chessman;
  expect(boardBishop).toBe(undefined);
});

test('Test board diagonal move check', () => {

  const board = new ChessBoard();

  expect(board.isDiagonalMove(4, 4, 6, 6)).toBe(true); // Diagonal move
  expect(board.isDiagonalMove(4, 4, 6, 2)).toBe(true); // Diagonal move
  expect(board.isDiagonalMove(4, 4, 2, 6)).toBe(true); // Diagonal move
  expect(board.isDiagonalMove(4, 4, 2, 2)).toBe(true); // Diagonal move

  expect(board.isDiagonalMove(4, 4, 6, 4)).toBe(false); // Non diagonal move
  expect(board.isDiagonalMove(4, 4, 4, 2)).toBe(false); // Non diagonal move
  expect(board.isDiagonalMove(4, 4, 2, 4)).toBe(false); // Non diagonal move
  expect(board.isDiagonalMove(4, 4, 4, 6)).toBe(false); // Non diagonal move
});

test('Test board straight move check', () => {

  const board = new ChessBoard();

  expect(board.isStraightMove(4, 4, 6, 4)).toBe(true); // Non diagonal move
  expect(board.isStraightMove(4, 4, 4, 2)).toBe(true); // Non diagonal move
  expect(board.isStraightMove(4, 4, 2, 4)).toBe(true); // Non diagonal move
  expect(board.isStraightMove(4, 4, 4, 6)).toBe(true); // Non diagonal move

  expect(board.isStraightMove(4, 4, 6, 6)).toBe(false); // Diagonal move
  expect(board.isStraightMove(4, 4, 6, 2)).toBe(false); // Diagonal move
  expect(board.isStraightMove(4, 4, 2, 6)).toBe(false); // Diagonal move
  expect(board.isStraightMove(4, 4, 2, 2)).toBe(false); // Diagonal move
});

test('Test board obstacle on movement path check', () => {
  const board = new ChessBoard();

  const obstacleRow = 4;
  const obstacleColumn = 4;

  const obstaclePawn = new Pawn({
    row: obstacleRow,
    column: obstacleColumn,
    color: ChessmanColor.White,
  });

  board.setChessmanAtPosition(obstacleRow, obstacleColumn, obstaclePawn);

  expect(board.isObstacleOnMovementPath(2, 2, 6, 6)).toBe(true); // Diagonal movement with obstacle.
  expect(board.isObstacleOnMovementPath(2, 6, 6, 2)).toBe(true); // Diagonal movement with obstacle.
  expect(board.isObstacleOnMovementPath(6, 2, 2, 6)).toBe(true); // Diagonal movement with obstacle.
  expect(board.isObstacleOnMovementPath(6, 6, 2, 2)).toBe(true); // Diagonal movement with obstacle.
  expect(board.isObstacleOnMovementPath(2, 2, 3, 3)).toBe(false); // Diagonal movement without obstacle.

  expect(board.isObstacleOnMovementPath(4, 2, 4, 6)).toBe(true); // Straight movement with obstacle.
  expect(board.isObstacleOnMovementPath(2, 4, 6, 4)).toBe(true); // Straight movement with obstacle.
  expect(board.isObstacleOnMovementPath(4, 6, 4, 2)).toBe(true); // Straight movement with obstacle.
  expect(board.isObstacleOnMovementPath(6, 4, 2, 4)).toBe(true); // Straight movement with obstacle.
  expect(board.isObstacleOnMovementPath(4, 2, 3, 6)).toBe(false); // Straight movement without obstacle.
});
