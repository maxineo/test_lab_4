import { IChessman } from "../interfaces/Chessman";
import { isAllowedPosition } from "../utils/isAllowedPosition";
import { ChessField } from "./ChessField";
import { Move } from './Move';

export class ChessBoard {

  private readonly fields: ChessField[];

  public setChessmanAtPosition(row: number, column: number, chessman: IChessman): void {
    if (isAllowedPosition(row, column)) {
      this.getFieldByPosition(row, column)?.setChessman(chessman);
    }
  }

  public getFieldByPosition(row: number, column: number): ChessField | null {
    return isAllowedPosition(row, column) ? this.fields[row * 8 + column] : null;
  }

  public isDiagonalMove(fromRow: number, fromColumn: number, toRow: number, toColumn: number): boolean {
    return Math.abs(toRow - fromRow) === Math.abs(toColumn - fromColumn);
  }

  public isStraightMove(fromRow: number, fromColumn: number, toRow: number, toColumn: number): boolean {
    return toRow !== fromRow && toColumn === fromColumn ||
      toColumn !== fromColumn && toRow === fromRow;
  }

  public isObstacleOnMovementPath(fromRow: number, fromColumn: number, toRow: number, toColumn: number): boolean {
    if (this.isDiagonalMove(fromRow, fromColumn, toRow, toColumn)) {
      const isMovingUp = toRow > fromRow;
      const isMovingRight = toColumn > fromColumn;
      for (let row = isMovingUp ? fromRow + 1 : fromRow - 1; isMovingUp ? row < toRow : row > toRow; row = isMovingUp ? ++row : --row) {
        for (let column = isMovingRight ? fromColumn + 1 : fromColumn - 1; isMovingRight ? column < toColumn : column > toColumn; isMovingRight ? column++ : column--) {
          if (this.getFieldByPosition(row, column)?.chessman != null) {
            return true;
          };
        };
      };
    };
    if (this.isStraightMove(fromRow, fromColumn, toRow, toColumn)) {
      const isMovingUp = toRow > fromRow;
      const isMovingDown = toRow < fromRow;
      const isMovingRight = toColumn > fromColumn;
      if (isMovingUp) {
        for (let row = fromRow + 1; row < toRow; row++) {
          if (this.getFieldByPosition(row, fromColumn)?.chessman != null) {
            return true;
          };
        };
      } else if (isMovingDown) {
        for (let row = fromRow - 1; row > toRow; row--) {
          if (this.getFieldByPosition(row, fromColumn)?.chessman != null) {
            return true;
          };
        };
      } else if (isMovingRight) {
        for (let column = fromColumn + 1; column < toColumn; column++) {
          if (this.getFieldByPosition(fromRow, column)?.chessman != null) {
            return true;
          };
        };
      } else {
        for (let column = fromColumn - 1; column > toColumn; column--) {
          if (this.getFieldByPosition(fromRow, column)?.chessman != null) {
            return true;
          };
        };
      };
    };
    return false;
  };

  public moveChessmanFromTo(fromRow: number, fromColumn: number, toRow: number, toColumn: number): Move {
    const incorrectMove = new Move({
      fromRow,
      fromColumn,
      toRow,
      toColumn,
      isSuccess: false,
      isAttack: false,
    });

    if (this.isObstacleOnMovementPath(fromRow, fromColumn, toRow, toColumn)) {
      return incorrectMove;
    };

    const movingChessField = this.getFieldByPosition(fromRow, fromColumn);
    const targetChessField = this.getFieldByPosition(toRow, toColumn);
    if (movingChessField === null || targetChessField === null) {
      return incorrectMove;
    };

    const movingChessman = movingChessField.chessman;
    const targetChessman = targetChessField.chessman;

    if (movingChessman === null) {
      return incorrectMove;
    };

    if (targetChessman?.color === movingChessman.color) {
      return incorrectMove;
    }

    if (!movingChessman.isCanMove(toRow, toColumn, targetChessman !== null)) {
      return incorrectMove;
    }

    targetChessField.chessman = movingChessman;
    movingChessman.row = toRow;
    movingChessman.column = toColumn;

    return new Move({
      fromRow,
      fromColumn,
      toRow,
      toColumn,
      isSuccess: true,
      isAttack: targetChessman !== null,
    })
  }

  public constructor() {
    this.fields = [];
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        this.fields.push(new ChessField({
          row,
          column,
          chessman: null,
        }));
      };
    };
    this.setChessmanAtPosition = this.setChessmanAtPosition.bind(this);
    this.getFieldByPosition = this.getFieldByPosition.bind(this);
    this.isDiagonalMove = this.isDiagonalMove.bind(this);
    this.isStraightMove = this.isStraightMove.bind(this);
    this.isObstacleOnMovementPath = this.isObstacleOnMovementPath.bind(this);
  }
}
