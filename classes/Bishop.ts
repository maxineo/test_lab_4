import { ChessmanColor } from "../enums/ChessmanColor";
import { ChessmanType } from "../enums/ChessmanType";
import { IChessman } from "../interfaces/Chessman";
import { isAllowedPosition } from "../utils/isAllowedPosition";
import { StrictOmit } from "../utils/StrictOmit";

type BishopCreationData = StrictOmit<Bishop, 'getPosition' | 'type' | 'isMoved' | 'isCanMove' | 'moveTo'>;

export class Bishop implements IChessman {

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
    return Math.abs(row - this.row) === Math.abs(column - this.column);
  };

  public moveTo(row: number, column: number) {
    this.row = row;
    this.column = column;
  };

  public constructor(data: BishopCreationData) {
    this.getPosition = this.getPosition.bind(this);
    this.isCanMove = this.isCanMove.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.type = ChessmanType.Bishop;
    this.isMoved = false;
    this.color = data.color;
    this.row = data.row;
    this.column = data.column;
  };

}