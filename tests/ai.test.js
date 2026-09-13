import { describe, it, expect } from 'vitest';
import { computeAiDy } from '../src/ai.js';

const computer = { x: 780, y: 160, width: 10, height: 80, dy: 0 };

describe('computeAiDy', () => {
  it('stays still when the ball is within the dead zone', () => {
    expect(computeAiDy(computer, 210)).toBe(0);
  });

  it('moves down when the ball is well below the paddle center', () => {
    expect(computeAiDy(computer, 300)).toBeGreaterThan(0);
  });

  it('moves up when the ball is well above the paddle center', () => {
    expect(computeAiDy(computer, 50)).toBeLessThan(0);
  });

  it('moves at the configured difficulty speed', () => {
    expect(computeAiDy(computer, 300, 5)).toBe(5);
  });
});
