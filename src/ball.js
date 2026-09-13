import { BALL_RADIUS, BALL_SPEED } from './constants.js';

export function createBall(canvasWidth, canvasHeight) {
  return {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: BALL_RADIUS,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
  };
}

export function moveBall(ball) {
  return { ...ball, x: ball.x + ball.dx, y: ball.y + ball.dy };
}

export function bounceOffWalls(ball, canvasHeight) {
  const hitTop = ball.y - ball.radius < 0;
  const hitBottom = ball.y + ball.radius > canvasHeight;

  if (!hitTop && !hitBottom) {
    return ball;
  }

  const y = hitTop ? ball.radius : canvasHeight - ball.radius;
  return { ...ball, y, dy: -ball.dy };
}

export function resetBall(canvasWidth, canvasHeight, speed = BALL_SPEED, rng = Math.random) {
  const direction = rng() > 0.5 ? 1 : -1;
  return {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: BALL_RADIUS,
    dx: direction * speed,
    dy: (rng() - 0.5) * speed * 2,
  };
}
