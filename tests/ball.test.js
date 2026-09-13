import { describe, it, expect } from 'vitest';
import { createBall, moveBall, bounceOffWalls, resetBall } from '../src/ball.js';
import { BALL_RADIUS, BALL_SPEED } from '../src/constants.js';

describe('createBall', () => {
  it('creates a ball centered on the canvas', () => {
    const ball = createBall(800, 400);

    expect(ball).toEqual({
      x: 400,
      y: 200,
      radius: BALL_RADIUS,
      dx: BALL_SPEED,
      dy: BALL_SPEED,
    });
  });
});

describe('moveBall', () => {
  it('advances position by its velocity', () => {
    const ball = { x: 100, y: 100, radius: 8, dx: 4, dy: -3 };

    const moved = moveBall(ball);

    expect(moved).toMatchObject({ x: 104, y: 97 });
  });

  it('does not mutate the original ball', () => {
    const ball = { x: 100, y: 100, radius: 8, dx: 4, dy: -3 };

    moveBall(ball);

    expect(ball).toMatchObject({ x: 100, y: 100 });
  });
});

describe('bounceOffWalls', () => {
  const canvasHeight = 400;

  it('reflects dy when hitting the top wall', () => {
    const ball = { x: 400, y: -2, radius: 8, dx: 4, dy: -4 };

    const bounced = bounceOffWalls(ball, canvasHeight);

    expect(bounced.dy).toBe(4);
    expect(bounced.y).toBe(8);
  });

  it('reflects dy when hitting the bottom wall', () => {
    const ball = { x: 400, y: canvasHeight + 2, radius: 8, dx: 4, dy: 4 };

    const bounced = bounceOffWalls(ball, canvasHeight);

    expect(bounced.dy).toBe(-4);
    expect(bounced.y).toBe(canvasHeight - 8);
  });

  it('leaves the ball unchanged mid-court', () => {
    const ball = { x: 400, y: 200, radius: 8, dx: 4, dy: 4 };

    const bounced = bounceOffWalls(ball, canvasHeight);

    expect(bounced).toEqual(ball);
  });
});

describe('resetBall', () => {
  it('centers the ball on the canvas', () => {
    const ball = resetBall(800, 400, BALL_SPEED, () => 0.9);

    expect(ball.x).toBe(400);
    expect(ball.y).toBe(200);
  });

  it('sends the ball right and gives it upward spin when rng is high', () => {
    const ball = resetBall(800, 400, BALL_SPEED, () => 0.9);

    expect(ball.dx).toBe(BALL_SPEED);
    expect(ball.dy).toBeGreaterThan(0);
  });

  it('sends the ball left and gives it downward spin when rng is low', () => {
    const ball = resetBall(800, 400, BALL_SPEED, () => 0.1);

    expect(ball.dx).toBe(-BALL_SPEED);
    expect(ball.dy).toBeLessThan(0);
  });
});
