import { IChessman } from "../interfaces/Chessman";
import { isAllowedPosition } from "../utils/isAllowedPosition";
import { ChessField } from "./ChessField";

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
  }
}
