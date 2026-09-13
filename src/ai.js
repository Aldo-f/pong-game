import { AI_DIFFICULTY, AI_DEADZONE } from './constants.js';

export function computeAiDy(paddle, ballY, difficulty = AI_DIFFICULTY, deadzone = AI_DEADZONE) {
  const paddleCenter = paddle.y + paddle.height / 2;
  const distance = ballY - paddleCenter;

  if (Math.abs(distance) <= deadzone) {
    return 0;
  }

  return distance > 0 ? difficulty : -difficulty;
}
