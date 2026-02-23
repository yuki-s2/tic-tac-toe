import { Square } from "@/components/Square";
import type { Board as BoardType } from "@/game";

type BoardProps = {
  squares: BoardType;
  winningLine: number[] | null;
  onPlay: (index: number) => void;
};

// 引数（ボードの状態、勝ちラインのインデックス、プレイヤーがクリックしたときの処理）
export function Board({ squares, winningLine, onPlay }: BoardProps) {
  const isWinning = (index: number) =>
    // インデックスが勝ちラインに含まれているか
    winningLine !== null && winningLine.includes(index);
  return (
    <div
        className="grid grid-cols-3 grid-rows-3 gap-1 w-[min(280px,90vw)] mx-auto aspect-square"
        role="grid"
      >
      {squares.map((value, index) => (
        // ボードの各マス
        <Square
          key={index}
          value={value}
          isWinning={isWinning(index)}
          onSquareClick={() => onPlay(index)}
        />
      ))}
    </div>
  );
}
