type MoveCreationData = Move;

export class Move {

  readonly fromRow: number;

  readonly fromColumn: number;

  readonly toRow: number;

  readonly toColumn: number;

  readonly isSuccess: boolean;

  readonly isAttack: boolean;

  public constructor(data: MoveCreationData) {
    this.fromRow = data.fromRow;
    this.fromColumn = data.fromColumn;
    this.toRow = data.toRow;
    this.toColumn = data.toColumn;
    this.isSuccess = data.isSuccess;
    this.isAttack = data.isAttack;
  };
};
