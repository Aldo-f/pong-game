import { describe, it, expect } from 'vitest';
import { createPaddle, movePaddle } from '../src/paddle.js';
import { PADDLE_WIDTH, PADDLE_HEIGHT } from '../src/constants.js';

describe('createPaddle', () => {
  it('creates a paddle at the given position with default dimensions', () => {
    const paddle = createPaddle(10, 50);

    expect(paddle).toEqual({
      x: 10,
      y: 50,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      dy: 0,
    });
  });
});

describe('movePaddle', () => {
  const canvasHeight = 400;

  it('moves the paddle down by dy', () => {
    const paddle = createPaddle(10, 100);

    const moved = movePaddle(paddle, 6, canvasHeight);

    expect(moved.y).toBe(106);
  });

  it('moves the paddle up by a negative dy', () => {
    const paddle = createPaddle(10, 100);

    const moved = movePaddle(paddle, -6, canvasHeight);

    expect(moved.y).toBe(94);
  });

  it('clamps the paddle to the top of the canvas', () => {
    const paddle = createPaddle(10, 2);

    const moved = movePaddle(paddle, -10, canvasHeight);

    expect(moved.y).toBe(0);
  });

  it('clamps the paddle to the bottom of the canvas', () => {
    const paddle = createPaddle(10, canvasHeight - PADDLE_HEIGHT - 2);

    const moved = movePaddle(paddle, 10, canvasHeight);

    expect(moved.y).toBe(canvasHeight - PADDLE_HEIGHT);
  });

  it('does not mutate the original paddle', () => {
    const paddle = createPaddle(10, 100);

    movePaddle(paddle, 6, canvasHeight);

    expect(paddle.y).toBe(100);
  });

  it('records the velocity used for the move', () => {
    const paddle = createPaddle(10, 100);

    const moved = movePaddle(paddle, 6, canvasHeight);

    expect(moved.dy).toBe(6);
  });
});
