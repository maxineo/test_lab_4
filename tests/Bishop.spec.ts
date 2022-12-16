import { Bishop } from '../classes/Bishop';
import { ChessmanColor } from '../enums/ChessmanColor';

test('Test bishop getPosition', () => {

  const bishop = new Bishop({
    row: 1,
    column: 1,
    color: ChessmanColor.White,
  });

  expect(bishop.getPosition()).toEqual({
    // Correct position
    row: 1,
    column: 1,
  });
});

test('Test bishop moveTo', () => {
  const bishop = new Bishop({
    row: 4,
    column: 4,
    color: ChessmanColor.White,
  });

  expect(bishop.getPosition()).toEqual({
    // Correct position
    row: 4,
    column: 4,
  });

  bishop.moveTo(6, 6, false);

  expect(bishop.getPosition()).toEqual({
    // Changed position
    row: 6,
    column: 6,
  })

  bishop.moveTo(6, 1, false); // Make incorrect move.

  expect(bishop.getPosition()).toEqual({
    // Not changed position
    row: 6,
    column: 6,
  })
});

test('Test bishop moves', () => {

  const bishop = new Bishop({
    row: 4,
    column: 4,
    color: ChessmanColor.White,
  });

  expect(bishop.isCanMove(5, 5, false)).toBe(true); // Move diagonally by 1
  expect(bishop.isCanMove(5, 3, false)).toBe(true); // Move diagonally by 1
  expect(bishop.isCanMove(3, 5, false)).toBe(true); // Move diagonally by 1
  expect(bishop.isCanMove(3, 3, false)).toBe(true); // Move diagonally by 1

  expect(bishop.isCanMove(7, 7, false)).toBe(true); // Move diagonally by 3
  expect(bishop.isCanMove(7, 1, false)).toBe(true); // Move diagonally by 3
  expect(bishop.isCanMove(1, 1, false)).toBe(true); // Move diagonally by 3
  expect(bishop.isCanMove(1, 7, false)).toBe(true); // Move diagonally by 3

  expect(bishop.isCanMove(10, 10, false)).toBe(false); // Move away from board

  expect(bishop.isCanMove(5, 4, false)).toBe(false); // Move up by 1
  expect(bishop.isCanMove(4, 3, false)).toBe(false); // Move left by 1
  expect(bishop.isCanMove(3, 4, false)).toBe(false); // Move down by 1
  expect(bishop.isCanMove(4, 5, false)).toBe(false); // Move right by 1

  expect(bishop.isCanMove(7, 4, false)).toBe(false); // Move up by 3
  expect(bishop.isCanMove(4, 1, false)).toBe(false); // Move left by 3
  expect(bishop.isCanMove(1, 4, false)).toBe(false); // Move down by 3
  expect(bishop.isCanMove(4, 7, false)).toBe(false); // Move right by 3
});

test('Test bishop moves', () => {

  const bishop = new Bishop({
    row: 4,
    column: 4,
    color: ChessmanColor.White,
  });

  expect(bishop.isCanMove(5, 5, true)).toBe(true); // Attack diagonally by 1
  expect(bishop.isCanMove(5, 3, true)).toBe(true); // Attack diagonally by 1
  expect(bishop.isCanMove(3, 5, true)).toBe(true); // Attack diagonally by 1
  expect(bishop.isCanMove(3, 3, true)).toBe(true); // Attack diagonally by 1

  expect(bishop.isCanMove(7, 7, true)).toBe(true); // Attack diagonally by 3
  expect(bishop.isCanMove(7, 1, true)).toBe(true); // Attack diagonally by 3
  expect(bishop.isCanMove(1, 1, true)).toBe(true); // Attack diagonally by 3
  expect(bishop.isCanMove(1, 7, true)).toBe(true); // Attack diagonally by 3

  expect(bishop.isCanMove(10, 10, true)).toBe(false); // Attack away from board

  expect(bishop.isCanMove(5, 4, true)).toBe(false); // Attack up by 1
  expect(bishop.isCanMove(4, 3, true)).toBe(false); // Attack left by 1
  expect(bishop.isCanMove(3, 4, true)).toBe(false); // Attack down by 1
  expect(bishop.isCanMove(4, 5, true)).toBe(false); // Attack right by 1

  expect(bishop.isCanMove(7, 4, true)).toBe(false); // Attack up by 3
  expect(bishop.isCanMove(4, 1, true)).toBe(false); // Attack left by 3
  expect(bishop.isCanMove(1, 4, true)).toBe(false); // Attack down by 3
  expect(bishop.isCanMove(4, 7, true)).toBe(false); // Attack right by 3
});