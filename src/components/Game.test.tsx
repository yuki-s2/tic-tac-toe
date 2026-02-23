import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { Game } from '@/components/Game'

describe('Game', () => {
  it('タイトルと次のプレイヤーが表示される', () => {
    render(<Game />)
    expect(screen.getByRole('heading', { name: /まるばつゲーム/ })).toBeInTheDocument()
    expect(screen.getByText(/次のプレイヤー: X/)).toBeInTheDocument()
  })

  it('マスをクリックすると X が置かれ、次は O の番になる', () => {
    render(<Game />)
    const buttons = screen.getAllByRole('button', { name: /空のマス|マス/ })
    fireEvent.click(buttons[0])
    expect(within(buttons[0]).getByText('X')).toBeInTheDocument()
    expect(screen.getByText(/次のプレイヤー: O/)).toBeInTheDocument()
  })

  it('O の手を打つと O が表示される', () => {
    render(<Game />)
    const buttons = screen.getAllByRole('button', { name: /空のマス|マス/ })
    fireEvent.click(buttons[0]) // X
    fireEvent.click(buttons[1]) // O
    expect(within(buttons[0]).getByText('X')).toBeInTheDocument()
    expect(within(buttons[1]).getByText('O')).toBeInTheDocument()
  })

  it('既に置いたマスはクリックしても変わらない', () => {
    render(<Game />)
    const buttons = screen.getAllByRole('button', { name: /空のマス|マス/ })
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[0]) // 同じマスを再度クリック
    expect(within(buttons[0]).getByText('X')).toBeInTheDocument()
    expect(screen.getByText(/次のプレイヤー: O/)).toBeInTheDocument()
  })

  it('横一列で X が揃うと「勝者: X」と表示される', () => {
    render(<Game />)
    const buttons = screen.getAllByRole('button', { name: /空のマス|マス/ })
    // 0(X), 4(O), 1(X), 5(O), 2(X) で 0-1-2 の横一列で X の勝ち
    fireEvent.click(buttons[0]) // X
    fireEvent.click(buttons[4]) // O
    fireEvent.click(buttons[1]) // X
    fireEvent.click(buttons[5]) // O
    fireEvent.click(buttons[2]) // X → 勝ち
    expect(screen.getByText(/勝者: X/)).toBeInTheDocument()
  })

  it('ゲーム終了後に「もう一度プレイ」ボタンが表示される', () => {
    render(<Game />)
    const buttons = screen.getAllByRole('button', { name: /空のマス|マス/ })
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[4])
    fireEvent.click(buttons[1])
    fireEvent.click(buttons[5])
    fireEvent.click(buttons[2])
    expect(screen.getByRole('button', { name: /もう一度プレイ/ })).toBeInTheDocument()
  })

  it('「もう一度プレイ」をクリックするとボードがリセットされる', () => {
    render(<Game />)
    const buttons = screen.getAllByRole('button', { name: /空のマス|マス/ })
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[4])
    fireEvent.click(buttons[1])
    fireEvent.click(buttons[5])
    fireEvent.click(buttons[2])
    fireEvent.click(screen.getByRole('button', { name: /もう一度プレイ/ }))
    expect(screen.getByText(/次のプレイヤー: X/)).toBeInTheDocument()
    const newButtons = screen.getAllByRole('button', { name: /空のマス|マス/ })
    expect(newButtons).toHaveLength(9)
    newButtons.forEach((btn) => {
      expect(btn).toHaveTextContent('')
    })
  })
})
