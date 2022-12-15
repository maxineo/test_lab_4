export interface Move {

  readonly columnChange: number;

  readonly rowChange: number;

  readonly isAttack?: boolean;
}