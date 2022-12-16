import { ChessmanType } from "../enums/ChessmanType";
import { ChessmanColor } from "../enums/ChessmanColor";
import { Move } from "./Move";

export interface IChessman {

  readonly row: number;

  readonly column: number;

  readonly type: ChessmanType;

  readonly color: ChessmanColor;

  readonly getPosition: () => {
    row: number;
    column: number;
  };

  readonly moveTo: (row: number, column: number) => void;

  readonly isCanMove: (row: number, column: number, isEnemy: boolean) => boolean;
};