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

  public constructor() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.fields.push(new ChessField({
          row: i,
          column: j,
          chessman: null,
        }))
      }
    };
    this.setChessmanAtPosition = this.setChessmanAtPosition.bind(this);
    this.getFieldByPosition = this.getFieldByPosition.bind(this);
  }
}
