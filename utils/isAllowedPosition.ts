export function isAllowedPosition(row: number, column: number): boolean {
  return row < 8 && row >= 0 && column < 8 && column >= 0;
}