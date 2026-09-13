import { SPIN_FACTOR } from './constants.js';

export function hitsPaddle(ball, paddle, side) {
  const withinPaddleHeight = ball.y > paddle.y && ball.y < paddle.y + paddle.height;
  const reachesPaddle =
    side === 'left'
      ? ball.x - ball.radius < paddle.x + paddle.width
      : ball.x + ball.radius > paddle.x;

  return reachesPaddle && withinPaddleHeight;
}

export function reflectFromPaddle(ball, paddle, side) {
  const direction = side === 'left' ? 1 : -1;
  const x = side === 'left' ? paddle.x + paddle.width + ball.radius : paddle.x - ball.radius;
  const hitOffset = (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);

  return {
    ...ball,
    dx: direction * Math.abs(ball.dx),
    x,
    dy: ball.dy + hitOffset * SPIN_FACTOR,
  };
}
