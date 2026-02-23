//まるばつゲームのロジック

export type Player = "O" | "X" | null;
export type Board = Player[];

// 勝ちラインの組み合わせ（インデックス）
const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * 勝者を判定する
 * @param squares 9マスのボード状態
 * @returns 勝者 'O' | 'X'、または null（引き分け/継続中）
 */

export function calculateWinner(squares: Board): Player {
  const line = getWinningLine(squares);
  // line[0]:勝者の記号(X or O)を返す
  return line !== null ? squares[line[0]] : null;
}

/**
 * 勝ちラインのインデックスを返す（ハイライト用）
 * @param squares 9マスのボード状態
 * @returns 揃った3マスのインデックス配列、または null
 */
export function getWinningLine(squares: Board): number[] | null {
  for (const [a, b, c] of LINES) {
    const player = squares[a];
    if (player && player === squares[b] && player === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

// ボードがすべて埋まっているか（引き分けか）を判定
export function isBoardFull(squares: Board): boolean {
  return squares.every((cell) => cell !== null);
}

// ゲームが終了しているか（勝者がいる or 引き分け）
export function isGameOver(squares: Board): boolean {
  return calculateWinner(squares) !== null || isBoardFull(squares);
}

// 初期ボード（空の9マス）
export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}
