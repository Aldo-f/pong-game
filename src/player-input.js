import { PLAYER_SPEED, MOUSE_DEADZONE } from './constants.js';

export function computePlayerDy(paddle, keys, mouseY, speed = PLAYER_SPEED, mouseDeadzone = MOUSE_DEADZONE) {
  let dy = 0;

  if (keys.up) {
    dy = -speed;
  } else if (keys.down) {
    dy = speed;
  }

  const paddleCenter = paddle.y + paddle.height / 2;
  const mouseDistance = mouseY - paddleCenter;

  if (Math.abs(mouseDistance) > mouseDeadzone) {
    dy = mouseDistance > 0 ? speed : -speed;
  }

  return dy;
}
