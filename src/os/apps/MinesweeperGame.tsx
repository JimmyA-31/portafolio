import { useCallback, useMemo, useState } from 'react';
import { Flag, Bomb } from '@phosphor-icons/react';
import './MinesweeperGame.css';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

function createBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0 }))
  );

  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placed += 1;
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].isMine) count += 1;
        }
      }
      board[r][c].neighborMines = count;
    }
  }

  return board;
}

export default function MinesweeperGame() {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const reset = useCallback(() => {
    setBoard(createBoard());
    setStatus('playing');
  }, []);

  const revealCell = useCallback((r: number, c: number) => {
    setBoard((prev) => {
      if (status !== 'playing') return prev;
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      const cell = next[r][c];
      if (cell.isRevealed || cell.isFlagged) return prev;

      if (cell.isMine) {
        next.forEach((row) => row.forEach((c2) => { if (c2.isMine) c2.isRevealed = true; }));
        setStatus('lost');
        return next;
      }

      const stack: [number, number][] = [[r, c]];
      while (stack.length) {
        const [cr, cc] = stack.pop()!;
        const cur = next[cr][cc];
        if (cur.isRevealed || cur.isFlagged) continue;
        cur.isRevealed = true;
        if (cur.neighborMines === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = cr + dr;
              const nc = cc + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !next[nr][nc].isRevealed) {
                stack.push([nr, nc]);
              }
            }
          }
        }
      }

      const allSafeRevealed = next.every((row) => row.every((c2) => c2.isMine || c2.isRevealed));
      if (allSafeRevealed) setStatus('won');

      return next;
    });
  }, [status]);

  const toggleFlag = useCallback((e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    e.stopPropagation();
    setBoard((prev) => {
      if (status !== 'playing') return prev;
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      const cell = next[r][c];
      if (!cell.isRevealed) cell.isFlagged = !cell.isFlagged;
      return next;
    });
  }, [status]);

  const flagsUsed = useMemo(
    () => board.reduce((acc, row) => acc + row.filter((c) => c.isFlagged).length, 0),
    [board]
  );

  const numberColors: Record<number, string> = {
    1: '#5BC0BE',
    2: '#6FFFE9',
    3: '#E5484D',
    4: '#9B5DE5',
    5: '#FCA311',
    6: '#5BC0BE',
    7: '#E5E5E5',
    8: '#E5E5E5',
  };

  return (
    <div className="mine-game">
      <div className="mine-header">
        <span>💣 {MINES - flagsUsed}</span>
        <button type="button" className="mine-reset-btn" onClick={reset}>
          {status === 'won' ? '😎' : status === 'lost' ? '😵' : '🙂'}
        </button>
        <span className="mine-hint">clic der: bandera</span>
      </div>

      <div className="mine-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              className={`mine-cell ${cell.isRevealed ? 'isRevealed' : ''}`}
              onClick={() => revealCell(r, c)}
              onContextMenu={(e) => toggleFlag(e, r, c)}
              disabled={status !== 'playing' && !cell.isRevealed}
            >
              {cell.isRevealed && cell.isMine && <Bomb size={12} weight="fill" color="#E5484D" />}
              {cell.isRevealed && !cell.isMine && cell.neighborMines > 0 && (
                <span style={{ color: numberColors[cell.neighborMines] }}>{cell.neighborMines}</span>
              )}
              {!cell.isRevealed && cell.isFlagged && <Flag size={11} weight="fill" color="var(--os-accent)" />}
            </button>
          ))
        )}
      </div>

      {status !== 'playing' && (
        <p className={`mine-status mine-status--${status}`}>
          {status === 'won' ? '¡Ganaste! 🎉' : 'Perdiste — clic en el emoji para reiniciar'}
        </p>
      )}
    </div>
  );
}