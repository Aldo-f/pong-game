import { describe, it, expect } from 'vitest';
import { hitsPaddle, reflectFromPaddle } from '../src/collisions.js';

const player = { x: 10, y: 160, width: 10, height: 80, dy: 0 };
const computer = { x: 780, y: 160, width: 10, height: 80, dy: 0 };

describe('hitsPaddle', () => {
  it('detects a hit on the left (player) paddle', () => {
    const ball = { x: 18, y: 200, radius: 8, dx: -4, dy: 0 };

    expect(hitsPaddle(ball, player, 'left')).toBe(true);
  });

  it('does not detect a hit when the ball is above the left paddle', () => {
    const ball = { x: 18, y: 100, radius: 8, dx: -4, dy: 0 };

    expect(hitsPaddle(ball, player, 'left')).toBe(false);
  });

  it('does not detect a hit when the ball has not reached the left paddle', () => {
    const ball = { x: 100, y: 200, radius: 8, dx: -4, dy: 0 };

    expect(hitsPaddle(ball, player, 'left')).toBe(false);
  });

  it('detects a hit on the right (computer) paddle', () => {
    const ball = { x: 782, y: 200, radius: 8, dx: 4, dy: 0 };

    expect(hitsPaddle(ball, computer, 'right')).toBe(true);
  });

  it('does not detect a hit when the ball has not reached the right paddle', () => {
    const ball = { x: 700, y: 200, radius: 8, dx: 4, dy: 0 };

    expect(hitsPaddle(ball, computer, 'right')).toBe(false);
  });
});

describe('reflectFromPaddle', () => {
  it('sends the ball rightward off the left paddle', () => {
    const ball = { x: 15, y: 200, radius: 8, dx: -4, dy: 0 };

    const reflected = reflectFromPaddle(ball, player, 'left');

    expect(reflected.dx).toBe(4);
    expect(reflected.x).toBe(player.x + player.width + ball.radius);
  });

  it('sends the ball leftward off the right paddle', () => {
    const ball = { x: 782, y: 200, radius: 8, dx: 4, dy: 0 };

    const reflected = reflectFromPaddle(ball, computer, 'right');

    expect(reflected.dx).toBe(-4);
    expect(reflected.x).toBe(computer.x - ball.radius);
  });

  it('adds no spin when the ball hits dead center', () => {
    const ball = { x: 15, y: 200, radius: 8, dx: -4, dy: 1 };

    const reflected = reflectFromPaddle(ball, player, 'left');

    expect(reflected.dy).toBe(1);
  });

  it('adds downward spin when the ball hits below center', () => {
    const ball = { x: 15, y: 220, radius: 8, dx: -4, dy: 0 };

    const reflected = reflectFromPaddle(ball, player, 'left');

    expect(reflected.dy).toBeGreaterThan(0);
  });

  it('adds upward spin when the ball hits above center', () => {
    const ball = { x: 15, y: 180, radius: 8, dx: -4, dy: 0 };

    const reflected = reflectFromPaddle(ball, player, 'left');

    expect(reflected.dy).toBeLessThan(0);
  });
});
