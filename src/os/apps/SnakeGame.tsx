import { useEffect, useRef, useState, useCallback } from 'react';
import './SnakeGame.css';

const CELL = 18;
const COLS = 20;
const ROWS = 20;
const TICK_MS = 130;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

function randomFood(snake: Point[]): Point {
  let candidate: Point;
  do {
    candidate = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === candidate.x && s.y === candidate.y));
  return candidate;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
  const [food, setFood] = useState<Point>(() => randomFood([{ x: 10, y: 10 }]));

  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const directionRef = useRef<Direction>('RIGHT');
  const lastAppliedDirection = useRef<Direction>('RIGHT');

  const reset = useCallback(() => {
    const initial = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    setSnake(initial);
    setFood(randomFood(initial));
    directionRef.current = 'RIGHT';
    lastAppliedDirection.current = 'RIGHT';

    setGameOver(false);
    setScore(0);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const map: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        s: 'DOWN',
        a: 'LEFT',
        d: 'RIGHT',
      };
      const next = map[e.key];
      if (!next) return;
      e.preventDefault();

      const opposite: Record<Direction, Direction> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
      if (opposite[next] === lastAppliedDirection.current) return;
      directionRef.current = next;
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const dir = directionRef.current;
        lastAppliedDirection.current = dir;
        const head = prev[0];
        const delta: Record<Direction, Point> = {
          UP: { x: 0, y: -1 },
          DOWN: { x: 0, y: 1 },
          LEFT: { x: -1, y: 0 },
          RIGHT: { x: 1, y: 0 },
        };
        const newHead = { x: head.x + delta[dir].x, y: head.y + delta[dir].y };

        const hitsWall = newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS;
        const hitsSelf = prev.some((s) => s.x === newHead.x && s.y === newHead.y);

        if (hitsWall || hitsSelf) {
          setGameOver(true);
          return prev;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];

        if (ateFood) {
          setScore((s) => s + 10);
          setFood(randomFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [gameOver, food]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#08111f';
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    ctx.fillStyle = '#FCA311';
    snake.forEach((s, i) => {
      ctx.globalAlpha = i === 0 ? 1 : 0.75;
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    });
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#E5E5E5';
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
  }, [snake, food]);

  return (
    <div className="snake-game">
      <div className="snake-header">
        <span>Snake.exe</span>
        <span className="snake-score">Score: {score}</span>
      </div>

      <div className="snake-canvas-wrap">
        <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} />
        {gameOver && (
          <div className="snake-overlay">
            <p>Game Over</p>
            <button type="button" onClick={reset}>Reiniciar</button>
          </div>
        )}
      </div>

      <p className="snake-hint">Flechas o WASD para moverte</p>
    </div>
  );
}