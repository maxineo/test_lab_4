import { ChessBoard } from "../classes/ChessBoard"

test('Test getFieldByPosition', () => {

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
})