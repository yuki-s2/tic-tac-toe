import type { Player } from "@/game";

type SquareProps = {
  value: Player;
  onSquareClick: () => void;
  isWinning?: boolean;
};

export function Square({
  value,
  onSquareClick,
  isWinning = false,
}: SquareProps) {
  const base =
    "w-full h-full min-w-0 min-h-0 flex items-center justify-center text-3xl font-bold border-2 text-inherit cursor-pointer transition-colors disabled:cursor-default";
  const normal =
    "border-black/20 bg-black/[0.03] hover:bg-black/[0.06] hover:border-black/35 dark:border-white/30 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/50";
  const winning =
    "border-emerald-500/60 bg-emerald-500/20 dark:border-emerald-400/60 dark:bg-emerald-500/25";

  return (
    <button
      type="button"
      className={`${base} ${isWinning ? winning : normal}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
