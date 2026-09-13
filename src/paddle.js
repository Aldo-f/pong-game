import { PADDLE_WIDTH, PADDLE_HEIGHT } from './constants.js';

export function createPaddle(x, y) {
  return { x, y, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, dy: 0 };
}

export function movePaddle(paddle, dy, canvasHeight) {
  const y = clamp(paddle.y + dy, 0, canvasHeight - paddle.height);
  return { ...paddle, y, dy };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
