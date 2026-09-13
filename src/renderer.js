const GLOW_COLOR = '#00ff88';
const BACKGROUND_COLOR = '#0f0f1e';

export class Renderer {
  constructor(ctx, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  draw({ player, computer, ball }) {
    this._clear();
    this._drawCenterLine();
    this._drawPaddle(player);
    this._drawPaddle(computer);
    this._drawBall(ball);
  }

  _clear() {
    const { ctx } = this;
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    ctx.shadowBlur = 0;
  }

  _drawCenterLine() {
    const { ctx } = this;
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(this.canvasWidth / 2, 0);
    ctx.lineTo(this.canvasWidth / 2, this.canvasHeight);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  _drawPaddle(paddle) {
    const { ctx } = this;
    ctx.fillStyle = GLOW_COLOR;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
    ctx.shadowBlur = 10;
  }

  _drawBall(ball) {
    const { ctx } = this;
    ctx.fillStyle = GLOW_COLOR;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
    ctx.shadowBlur = 10;
  }
}
