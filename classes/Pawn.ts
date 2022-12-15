import { ChessmanColor } from "../enums/ChessmanColor";
import { ChessmanType } from "../enums/ChessmanType";
import { IChessman } from "../interfaces/Chessman";
import { isAllowedPosition } from "../utils/isAllowedPosition";
import { StrictOmit } from "../utils/StrictOmit";
import { ChessField } from "./ChessField";

type PawnCreationData = StrictOmit<Pawn, 'getPosition' | 'type' | 'isMoved'>;

export class Pawn implements IChessman {

  public row: number;

  public column: number;

  public isMoved: boolean;

  public readonly type: ChessmanType;

  public readonly color: ChessmanColor;

  public getPosition: () => ChessField;

  public isCanMove(row: number, column: number, isEnemy: boolean): boolean {
    if (!isAllowedPosition(row, column)) {
      return false;
    }
    if (isEnemy) {
      return this.color === ChessmanColor.White ?
        row - this.row === 1 && column - this.column === 1 || this.column === -1 :
        row - this.row === -1 && column - this.column === 1 || this.column === -1;
    }
    if (column !== this.column) {
      return false;
    }
    if (this.isMoved) {
      return this.color === ChessmanColor.White ?
        row - this.row === 1 :
        row - this.row === -1;
    }
    return this.color === ChessmanColor.White ?
      row - this.row === 1 || row - this.row === 2 :
      row - this.row === -1 || row - this.row === -2;
  }

  public constructor(data: PawnCreationData) {
    this.getPosition = this.getPosition.bind(this);
    this.type = ChessmanType.Pawn;
    this.isMoved = false;
    this.color = data.color;
    this.row = data.row;
    this.column = data.column;
  }

}