# まるばつゲーム（Tic-Tac-Toe）

React + TypeScript + Vite で作った三目並べの Web アプリです。

## できること

- **対戦**: 2人で X と O を交互に置いて遊べます
- **勝敗判定**: 縦・横・斜めのいずれかが揃うと勝者を表示
- **引き分け**: マスが埋まって勝者がいないときは引き分けを表示
- **リセット**: ゲーム終了後に「もう一度プレイ」で最初から遊べます

## 技術スタック

| 種類 | 技術 |
|------|------|
| フレームワーク | React 19 |
| 言語 | TypeScript |
| ビルド | Vite 7 |
| スタイル | Tailwind CSS 4 |
| テスト | Vitest + React Testing Library |

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで表示される URL（例: http://localhost:5173）を開いてプレイできます。

## コマンド一覧

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run test` | テストを実行（ウォッチモード） |
| `npm run lint` | ESLint でコードをチェック |

## プロジェクト構成

```
src/
├── main.tsx          # エントリポイント
├── App.tsx           # ルートコンポーネント
├── game.ts           # ゲームロジック（勝敗判定など）
├── game.test.ts      # game.ts のテスト
├── index.css         # スタイル
├── components/
│   ├── Game.tsx      # ゲーム全体の状態とUI
│   ├── Game.test.tsx # Game コンポーネントのテスト
│   ├── Board.tsx     # 3×3 のマス目
│   └── Square.tsx    # 1マス分のボタン
└── test/
    └── setup.ts      # テストのセットアップ
```
