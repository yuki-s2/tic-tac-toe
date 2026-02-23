import { useState } from "react";
import { Board } from "@/components/Board";
import {
  calculateWinner,
  getWinningLine,
  isBoardFull,
  createEmptyBoard,
  type Board as BoardType,
  type Player,
} from "@/game";

export function Game() {
  // ボードの状態管理
  const [squares, setSquares] = useState<BoardType>(createEmptyBoard());
  // 次のプレイヤーの状態管理
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  // 勝ちラインのインデックス
  const winningLine = getWinningLine(squares);
  // 勝者なし、かつボードが埋まっている状態
  const draw = !winner && isBoardFull(squares);
  // 勝者がいる状態もしくは引き分け
  const gameOver = !!winner || draw;

  function handlePlay(index: number) {
    // ボードが空でないか、ゲームが終了している場合は処理を中断
    if (squares[index] !== null || gameOver) return;

    // squaresの中身をコピーしてnextSquaresに代入
    const nextSquares = squares.slice();

    // xIsNext が true なら X、false なら O を代入
    nextSquares[index] = (xIsNext ? "X" : "O") as Player;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    // ボードを空にする
    setSquares(createEmptyBoard());
    setXIsNext(true);
  }

  function getStatus(): string {
    if (winner) return `勝者: ${winner}`;
    if (draw) return "引き分け";
    return `次のプレイヤー: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col justify-end items-center shrink-0">
        <h1 className="text-[1.75rem] mb-1">まるばつゲーム</h1>
        <p
          className="text-[1.1rem] font-medium min-h-[1.5em] mb-4"
          aria-live="polite"
        >
          {getStatus()}
        </p>
      </div>
      <div className="flex-none flex justify-center items-center">
        <Board squares={squares} winningLine={winningLine} onPlay={handlePlay} />
      </div>
      <div className="flex-1 flex flex-col justify-start items-center pt-4 shrink-0">
        <button
          type="button"
          className={`px-5 py-2.5 text-base rounded-lg border border-transparent bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600 active:scale-[0.98] transition-colors ${!gameOver ? 'invisible pointer-events-none' : ''}`}
          onClick={handleReset}
          tabIndex={gameOver ? 0 : -1}
          aria-hidden={!gameOver}
        >
          Replay
        </button>
      </div>
    </div>
  );
}
