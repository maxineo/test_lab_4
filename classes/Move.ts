type MoveCreationData = Move;

export class Move {

  readonly fromRow: number;

  readonly fromColumn: number;

  readonly toRow: number;

  readonly toColumn: number;

  readonly isSuccess: boolean;

  readonly isAttack: boolean;

  public asString(): string {
    if (this.isAttack) {
      return (`Attacked from ${this.fromRow}:${this.fromColumn} to ${this.toRow}:${this.toColumn}`);
    } else if (this.isSuccess) {
      return (`Moved from ${this.fromRow}:${this.fromColumn} to ${this.toRow}:${this.toColumn}`);
    } else {
      return (`Cannot move from ${this.fromRow}:${this.fromColumn} to ${this.toRow}:${this.toColumn}`);
    }
  }

  public constructor(data: MoveCreationData) {
    this.fromRow = data.fromRow;
    this.fromColumn = data.fromColumn;
    this.toRow = data.toRow;
    this.toColumn = data.toColumn;
    this.isSuccess = data.isSuccess;
    this.isAttack = data.isAttack;
    this.asString = this.asString.bind(this);
  };
};
