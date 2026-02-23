import { describe, it, expect } from 'vitest'
import {
  calculateWinner,
  isBoardFull,
  isGameOver,
  createEmptyBoard,
  type Board,
} from '@/game'

describe('calculateWinner', () => {
  it('空のボードでは null を返す', () => {
    const board: Board = createEmptyBoard()
    expect(calculateWinner(board)).toBe(null)
  })

  it('横一列で O が揃うと O を返す', () => {
    const board: Board = ['O', 'O', 'O', null, null, null, null, null, null]
    expect(calculateWinner(board)).toBe('O')
  })

  it('横一列で X が揃うと X を返す', () => {
    const board: Board = [null, null, null, 'X', 'X', 'X', null, null, null]
    expect(calculateWinner(board)).toBe('X')
  })

  it('縦一列で揃うと勝者を返す', () => {
    const board: Board = ['O', null, null, 'O', null, null, 'O', null, null]
    expect(calculateWinner(board)).toBe('O')
  })

  it('斜め（左上→右下）で揃うと勝者を返す', () => {
    const board: Board = ['X', null, null, null, 'X', null, null, null, 'X']
    expect(calculateWinner(board)).toBe('X')
  })

  it('斜め（右上→左下）で揃うと勝者を返す', () => {
    const board: Board = [null, null, 'O', null, 'O', null, 'O', null, null]
    expect(calculateWinner(board)).toBe('O')
  })

  it('勝者がいない途中経過では null を返す', () => {
    const board: Board = ['O', 'X', 'O', 'X', 'O', null, null, null, null]
    expect(calculateWinner(board)).toBe(null)
  })
})

describe('isBoardFull', () => {
  it('空のボードでは false', () => {
    expect(isBoardFull(createEmptyBoard())).toBe(false)
  })

  it('すべて埋まっていると true', () => {
    const board: Board = ['O', 'X', 'O', 'X', 'O', 'X', 'X', 'O', 'X']
    expect(isBoardFull(board)).toBe(true)
  })

  it('一部だけ埋まっていると false', () => {
    const board: Board = ['O', 'X', 'O', null, null, null, null, null, null]
    expect(isBoardFull(board)).toBe(false)
  })
})

describe('isGameOver', () => {
  it('勝者がいれば true', () => {
    const board: Board = ['O', 'O', 'O', null, null, null, null, null, null]
    expect(isGameOver(board)).toBe(true)
  })

  it('引き分け（満杯）なら true', () => {
    const board: Board = ['O', 'X', 'O', 'X', 'O', 'X', 'X', 'O', 'X']
    expect(isGameOver(board)).toBe(true)
  })

  it('継続中なら false', () => {
    expect(isGameOver(createEmptyBoard())).toBe(false)
    const board: Board = ['O', 'X', null, null, null, null, null, null, null]
    expect(isGameOver(board)).toBe(false)
  })
})

describe('createEmptyBoard', () => {
  it('長さ9の null 配列を返す', () => {
    const board = createEmptyBoard()
    expect(board).toHaveLength(9)
    expect(board.every((cell) => cell === null)).toBe(true)
  })
})
