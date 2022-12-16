import { Pawn } from '../classes/Pawn';
import { ChessmanColor } from '../enums/ChessmanColor';

test('Test pawn getPosition', () => {

  const pawn = new Pawn({
    row: 1,
    column: 1,
    color: ChessmanColor.White,
  });

  expect(pawn.getPosition()).toEqual({ // Correct row and column
    row: 1,
    column: 1,
  })
})

test('Test white pawn moves which did`nt move', () => {

  const pawn = new Pawn({
    row: 1,
    column: 1,
    color: ChessmanColor.White,
  });

  expect(pawn.isCanMove(2, 1, false)).toBe(true); // move forward by 1
  expect(pawn.isCanMove(3, 1, false)).toBe(true); // move forward by 2
  expect(pawn.isCanMove(4, 1, false)).toBe(false); // move forward by 3
  expect(pawn.isCanMove(2, 2, false)).toBe(false); // move diagonally
  expect(pawn.isCanMove(2, 0, false)).toBe(false); // move diagonally
  expect(pawn.isCanMove(0, 1, false)).toBe(false); // move backward
  expect(pawn.isCanMove(1, 2, false)).toBe(false); // move right
  expect(pawn.isCanMove(1, 0, false)).toBe(false); // move left
  expect(pawn.isCanMove(99, 99, false)).toBe(false); // move away from board
});

test('Test black pawn moves which did`nt move', () => {

  const pawn = new Pawn({
    row: 6,
    column: 6,
    color: ChessmanColor.Black,
  });

  expect(pawn.isCanMove(5, 6, false)).toBe(true); // move forward by 1
  expect(pawn.isCanMove(4, 6, false)).toBe(true); // move forward by 2
  expect(pawn.isCanMove(3, 6, false)).toBe(false); // move forward by 3
  expect(pawn.isCanMove(5, 7, false)).toBe(false); // move diagonally
  expect(pawn.isCanMove(5, 5, false)).toBe(false); // move diagonally
  expect(pawn.isCanMove(7, 6, false)).toBe(false); // move backward
  expect(pawn.isCanMove(6, 5, false)).toBe(false); // move right
  expect(pawn.isCanMove(6, 7, false)).toBe(false); // move left
  expect(pawn.isCanMove(99, 99, false)).toBe(false); // move away from board
});

test('Test white pawn moves which already moved', () => {

  const pawn = new Pawn({
    row: 2,
    column: 1,
    color: ChessmanColor.White,
  });

  expect(pawn.isCanMove(3, 1, false)).toBe(true); // move forward by 1
  expect(pawn.isCanMove(4, 1, false)).toBe(false); // move forward by 2
  expect(pawn.isCanMove(5, 1, false)).toBe(false); // move forward by 3
  expect(pawn.isCanMove(3, 2, false)).toBe(false); // move diagonally
  expect(pawn.isCanMove(3, 0, false)).toBe(false); // move diagonally
  expect(pawn.isCanMove(1, 1, false)).toBe(false); // move backward
  expect(pawn.isCanMove(1, 2, false)).toBe(false); // move right
  expect(pawn.isCanMove(1, 0, false)).toBe(false); // move left
  expect(pawn.isCanMove(99, 99, false)).toBe(false); // move away from board
});

test('Test black pawn moves which already moved', () => {

  const pawn = new Pawn({
    row: 5,
    column: 6,
    color: ChessmanColor.Black,
  });

  expect(pawn.isCanMove(4, 6, false)).toBe(true); // move forward by 1
  expect(pawn.isCanMove(3, 6, false)).toBe(false); // move forward by 2
  expect(pawn.isCanMove(2, 6, false)).toBe(false); // move forward by 3
  expect(pawn.isCanMove(4, 7, false)).toBe(false); // move diagonally
  expect(pawn.isCanMove(4, 5, false)).toBe(false); // move diagonally
  expect(pawn.isCanMove(6, 6, false)).toBe(false); // move backward
  expect(pawn.isCanMove(6, 5, false)).toBe(false); // move right
  expect(pawn.isCanMove(6, 7, false)).toBe(false); // move left
  expect(pawn.isCanMove(99, 99, false)).toBe(false); // move away from board
});

test('Test white pawn attack moves', () => {

  const pawn = new Pawn({
    row: 2,
    column: 2,
    color: ChessmanColor.White,
  });

  expect(pawn.isCanMove(3, 1, true)).toBe(true); // attack diagonally forward
  expect(pawn.isCanMove(3, 3, true)).toBe(true); // attack diagonally forward
  expect(pawn.isCanMove(0, 1, true)).toBe(false); // attack diagonally backward
  expect(pawn.isCanMove(0, 3, true)).toBe(false); // attack diagonally backward
  expect(pawn.isCanMove(3, 2, true)).toBe(false); // attack forward
  expect(pawn.isCanMove(1, 2, true)).toBe(false); // attack backward
  expect(pawn.isCanMove(5, 5, true)).toBe(false); // attack diagonally by many fields
  expect(pawn.isCanMove(2, 1, true)).toBe(false); // attack right
  expect(pawn.isCanMove(2, 3, true)).toBe(false); // attack left
});

test('Test black pawn attack moves', () => {

  const pawn = new Pawn({
    row: 4,
    column: 4,
    color: ChessmanColor.Black,
  });

  expect(pawn.isCanMove(3, 3, true)).toBe(true); // attack diagonally
  expect(pawn.isCanMove(3, 5, true)).toBe(true); // attack diagonally
  expect(pawn.isCanMove(5, 3, true)).toBe(false); // attack diagonally backward
  expect(pawn.isCanMove(5, 5, true)).toBe(false); // attack diagonally backward
  expect(pawn.isCanMove(3, 4, true)).toBe(false); // attack forward
  expect(pawn.isCanMove(5, 4, true)).toBe(false); // attack backward
  expect(pawn.isCanMove(1, 1, true)).toBe(false); // attack diagonally by many fields
  expect(pawn.isCanMove(4, 5, true)).toBe(false); // attack right
  expect(pawn.isCanMove(4, 3, true)).toBe(false); // attack left
});

test('Test white pawn promotion', () => {

  const promotablePawn = new Pawn({
    row: 7,
    column: 2,
    color: ChessmanColor.White,
  });

  const nonPromotablePawn = new Pawn({
    row: 5,
    column: 2,
    color: ChessmanColor.White,
  });

  expect(promotablePawn.isCanPromote()).toBe(true);
  expect(nonPromotablePawn.isCanPromote()).toBe(false);
})

test('Test black pawn promotion', () => {

  const promotablePawn = new Pawn({
    row: 0,
    column: 2,
    color: ChessmanColor.Black,
  });

  const nonPromotablePawn = new Pawn({
    row: 4,
    column: 2,
    color: ChessmanColor.Black,
  });

  expect(promotablePawn.isCanPromote()).toBe(true);
  expect(nonPromotablePawn.isCanPromote()).toBe(false);
});
