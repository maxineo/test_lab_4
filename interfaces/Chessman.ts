import { ChessmanType } from "../enums/ChessmanType";
import { ChessmanColor } from "../enums/ChessmanColor";

export interface IChessman {

  row: number;

  column: number;

  readonly type: ChessmanType;

  readonly color: ChessmanColor;

  readonly getPosition: () => {
    row: number;
    column: number;
  };

  readonly moveTo: (row: number, column: number,  isEnemy: boolean) => void;

  readonly isCanMove: (row: number, column: number, isEnemy: boolean) => boolean;
};