import { ChessmanColor } from "../enums/ChessmanColor";
import { ChessmanType } from "../enums/ChessmanType";
import { IChessman } from "../interfaces/Chessman";
import { Move } from "../interfaces/Move";
import { isAllowedPosition } from "../utils/isAllowedPosition";
import { StrictOmit } from "../utils/StrictOmit";

type PawnCreationData = StrictOmit<Pawn, 'getPosition' | 'type' | 'isMoved' | 'isCanMove' | 'isCanPromote' | 'moveTo'>;

const WHITE_PAWN_INIT_ROW = 1;
const BLACK_PAWN_INIT_ROW = 6;

export class Pawn implements IChessman {

  public row: number;

  public column: number;

  public isMoved: boolean;

  public readonly type: ChessmanType;

  public readonly color: ChessmanColor;

  public getPosition() {
    return {
      row: this.row,
      column: this.column,
    };
  };

  public isCanMove(row: number, column: number, isEnemy: boolean): boolean {
    if (!isAllowedPosition(row, column)) {
      return false;
    };
    if (isEnemy) {
      return this.color === ChessmanColor.White ?
        row - this.row === 1 && (column - this.column === 1 || column - this.column === -1) :
        row - this.row === -1 && (column - this.column === 1 || column - this.column === -1);
    };
    if (column !== this.column) {
      return false;
    };
    if (this.color === ChessmanColor.White ? this.row !== WHITE_PAWN_INIT_ROW : this.row !== BLACK_PAWN_INIT_ROW) {
      return this.color === ChessmanColor.White ?
        row - this.row === 1 :
        row - this.row === -1;
    };
    return this.color === ChessmanColor.White ?
      row - this.row === 1 || row - this.row === 2 :
      row - this.row === -1 || row - this.row === -2;
  };

  public isCanPromote(): boolean {
    return this.color === ChessmanColor.White ? this.row === 7 : this.row === 0;
  };

  public moveTo(row: number, column: number): void {
    this.row = row;
    this.column = column;
  };

  public constructor(data: PawnCreationData) {
    this.getPosition = this.getPosition.bind(this);
    this.isCanMove = this.isCanMove.bind(this);
    this.isCanPromote = this.isCanPromote.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.type = ChessmanType.Pawn;
    this.isMoved = false;
    this.color = data.color;
    this.row = data.row;
    this.column = data.column;
  };

}