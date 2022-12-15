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
  expect(pawn.isCanMove(0, 1, false)).toBe(false); // move backwards
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
  expect(pawn.isCanMove(7, 6, false)).toBe(false); // move backwards
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
  expect(pawn.isCanMove(1, 1, false)).toBe(false); // move backwards
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
  expect(pawn.isCanMove(6, 6, false)).toBe(false); // move backwards
  expect(pawn.isCanMove(99, 99, false)).toBe(false); // move away from board
});