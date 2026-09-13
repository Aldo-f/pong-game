import { describe, it, expect } from 'vitest';
import { Game } from '../src/game.js';

const noKeys = { up: false, down: false };

describe('Game', () => {
  it('starts paused with a centered ball and zeroed scoreboard', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });
    const state = game.getState();

    expect(state.running).toBe(false);
    expect(state.ball.x).toBe(400);
    expect(state.ball.y).toBe(200);
    expect(state.scoreboard).toEqual({ player: 0, computer: 0 });
  });

  it('does not move anything while paused', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });
    const before = game.getState();

    game.update({ up: true, down: false }, 0);
    const after = game.getState();

    expect(after.player).toEqual(before.player);
    expect(after.ball).toEqual(before.ball);
  });

  it('moves the player paddle from input once running', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });
    game.start();
    const startPlayer = game.getState().player;
    const paddleCenter = startPlayer.y + startPlayer.height / 2;

    game.update({ up: false, down: true }, paddleCenter);

    expect(game.getState().player.y).toBeGreaterThan(startPlayer.y);
  });

  it('moves the computer paddle to track the ball once running', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });
    game.start();
    game.ball = { ...game.ball, y: 390 };
    const startY = game.getState().computer.y;

    game.update(noKeys, game.getState().player.y);

    expect(game.getState().computer.y).toBeGreaterThan(startY);
  });

  it('awards the player a point and resets the ball when it passes the computer edge', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });
    game.start();
    game.ball = { x: 795, y: 30, radius: 8, dx: 20, dy: 0 };

    game.update(noKeys, game.getState().player.y);

    const state = game.getState();
    expect(state.scoreboard.player).toBe(1);
    expect(state.scoreboard.computer).toBe(0);
    expect(state.ball.x).toBe(400);
  });

  it('awards the computer a point and resets the ball when it passes the player edge', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });
    game.start();
    game.ball = { x: 5, y: 30, radius: 8, dx: -20, dy: 0 };

    game.update(noKeys, game.getState().player.y);

    const state = game.getState();
    expect(state.scoreboard.computer).toBe(1);
    expect(state.scoreboard.player).toBe(0);
  });

  it('bounces the ball back when it reaches the player paddle', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });
    game.start();
    const { player } = game.getState();
    game.ball = { x: player.x + player.width + 8, y: player.y + player.height / 2, radius: 8, dx: -4, dy: 0 };

    game.update(noKeys, player.y);

    expect(game.getState().ball.dx).toBeGreaterThan(0);
  });

  it('reset() zeroes the scoreboard and re-centers the ball', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });
    game.start();
    game.ball = { x: 795, y: 30, radius: 8, dx: 20, dy: 0 };
    game.update(noKeys, 200);

    game.reset();
    const state = game.getState();

    expect(state.scoreboard).toEqual({ player: 0, computer: 0 });
    expect(state.ball.x).toBe(400);
  });

  it('toggleRunning flips and returns the running flag', () => {
    const game = new Game({ canvasWidth: 800, canvasHeight: 400, rng: () => 0.9 });

    expect(game.toggleRunning()).toBe(true);
    expect(game.toggleRunning()).toBe(false);
  });
});
