import { IChessman } from "../interfaces/Chessman";
import { StrictOmit } from "../utils/StrictOmit";

type ChessFieldCreationData = StrictOmit<ChessField, 'setChessman'>;

export class ChessField {

  public readonly row: number;

  public readonly column: number;

  public chessman: IChessman | null;

  public setChessman(newChessman: IChessman | null): IChessman | null {
    const oldChessman = this.chessman;
    this.chessman = newChessman;
    return oldChessman;
  }

  public constructor(data: ChessFieldCreationData) {
    this.row = data.row;
    this.column = data.column;
    this.chessman = null;
    this.setChessman = this.setChessman.bind(this);
  }
};