import { describe, it, expect } from 'vitest';
import { createScoreboard, pointForPlayer, pointForComputer } from '../src/scoreboard.js';

describe('scoreboard', () => {
  it('starts at zero-zero', () => {
    expect(createScoreboard()).toEqual({ player: 0, computer: 0 });
  });

  it('awards a point to the player without touching the computer score', () => {
    const scoreboard = pointForPlayer({ player: 2, computer: 3 });

    expect(scoreboard).toEqual({ player: 3, computer: 3 });
  });

  it('awards a point to the computer without touching the player score', () => {
    const scoreboard = pointForComputer({ player: 2, computer: 3 });

    expect(scoreboard).toEqual({ player: 2, computer: 4 });
  });
});
