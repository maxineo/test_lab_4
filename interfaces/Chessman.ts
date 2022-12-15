import { ChessField } from "../classes/ChessField";
import { ChessmanType } from "../enums/ChessmanType";
import { ChessmanColor } from "../enums/ChessmanColor";

export interface IChessman {

  readonly row: number;

  readonly column: number;

  readonly type: ChessmanType;

  readonly color: ChessmanColor;

  readonly getPosition: () => {
    row: number;
    column: number;
  };

  readonly isCanMove: (row: number, column: number, isEnemy: boolean) => boolean;
};