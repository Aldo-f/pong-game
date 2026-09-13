import { CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_MARGIN, PADDLE_HEIGHT, BALL_SPEED } from './constants.js';
import { createPaddle, movePaddle } from './paddle.js';
import { createBall, moveBall, bounceOffWalls, resetBall } from './ball.js';
import { hitsPaddle, reflectFromPaddle } from './collisions.js';
import { computeAiDy } from './ai.js';
import { computePlayerDy } from './player-input.js';
import { createScoreboard, pointForPlayer, pointForComputer } from './scoreboard.js';

export class Game {
  constructor({ canvasWidth = CANVAS_WIDTH, canvasHeight = CANVAS_HEIGHT, rng = Math.random } = {}) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.rng = rng;
    this.running = false;

    const paddleY = canvasHeight / 2 - PADDLE_HEIGHT / 2;
    this.player = createPaddle(PADDLE_MARGIN, paddleY);
    this.computer = createPaddle(canvasWidth - PADDLE_MARGIN - this.player.width, paddleY);
    this.ball = createBall(canvasWidth, canvasHeight);
    this.scoreboard = createScoreboard();
  }

  start() {
    this.running = true;
  }

  pause() {
    this.running = false;
  }

  toggleRunning() {
    this.running = !this.running;
    return this.running;
  }

  reset() {
    this.scoreboard = createScoreboard();
    this.ball = resetBall(this.canvasWidth, this.canvasHeight, BALL_SPEED, this.rng);
  }

  update(keys, mouseY) {
    if (!this.running) {
      return;
    }

    this._movePlayer(keys, mouseY);
    this._moveComputer();
    this._moveBall();
    this._handlePaddleCollisions();
    this._handleScoring();
  }

  getState() {
    return {
      running: this.running,
      player: this.player,
      computer: this.computer,
      ball: this.ball,
      scoreboard: this.scoreboard,
    };
  }

  _movePlayer(keys, mouseY) {
    const dy = computePlayerDy(this.player, keys, mouseY);
    this.player = movePaddle(this.player, dy, this.canvasHeight);
  }

  _moveComputer() {
    const dy = computeAiDy(this.computer, this.ball.y);
    this.computer = movePaddle(this.computer, dy, this.canvasHeight);
  }

  _moveBall() {
    this.ball = bounceOffWalls(moveBall(this.ball), this.canvasHeight);
  }

  _handlePaddleCollisions() {
    if (hitsPaddle(this.ball, this.player, 'left')) {
      this.ball = reflectFromPaddle(this.ball, this.player, 'left');
    }

    if (hitsPaddle(this.ball, this.computer, 'right')) {
      this.ball = reflectFromPaddle(this.ball, this.computer, 'right');
    }
  }

  _handleScoring() {
    if (this.ball.x - this.ball.radius < 0) {
      this.scoreboard = pointForComputer(this.scoreboard);
      this.ball = resetBall(this.canvasWidth, this.canvasHeight, BALL_SPEED, this.rng);
      return;
    }

    if (this.ball.x + this.ball.radius > this.canvasWidth) {
      this.scoreboard = pointForPlayer(this.scoreboard);
      this.ball = resetBall(this.canvasWidth, this.canvasHeight, BALL_SPEED, this.rng);
    }
  }
}
