import { describe, it, expect } from 'vitest';
import { computePlayerDy } from '../src/player-input.js';

const paddle = { x: 10, y: 160, width: 10, height: 80, dy: 0 };
const paddleCenter = paddle.y + paddle.height / 2; // 200

describe('computePlayerDy', () => {
  it('moves up when the up key is held', () => {
    expect(computePlayerDy(paddle, { up: true, down: false }, paddleCenter)).toBeLessThan(0);
  });

  it('moves down when the down key is held', () => {
    expect(computePlayerDy(paddle, { up: false, down: true }, paddleCenter)).toBeGreaterThan(0);
  });

  it('stays still when no key is held and the mouse has not moved', () => {
    expect(computePlayerDy(paddle, { up: false, down: false }, paddleCenter)).toBe(0);
  });

  it('follows the mouse when it is below the paddle center', () => {
    expect(computePlayerDy(paddle, { up: false, down: false }, paddleCenter + 50)).toBeGreaterThan(0);
  });

  it('follows the mouse when it is above the paddle center', () => {
    expect(computePlayerDy(paddle, { up: false, down: false }, paddleCenter - 50)).toBeLessThan(0);
  });

  it('ignores tiny mouse movements inside the dead zone', () => {
    expect(computePlayerDy(paddle, { up: false, down: false }, paddleCenter + 2)).toBe(0);
  });

  it('lets mouse movement override held keys', () => {
    expect(
      computePlayerDy(paddle, { up: true, down: false }, paddleCenter + 50)
    ).toBeGreaterThan(0);
  });
});
