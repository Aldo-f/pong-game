import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';
import { Game } from './game.js';
import { InputController } from './input-controller.js';
import { Renderer } from './renderer.js';

const canvas = document.getElementById('pongCanvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const game = new Game({ canvasWidth: CANVAS_WIDTH, canvasHeight: CANVAS_HEIGHT });
const input = new InputController(canvas);
const renderer = new Renderer(canvas.getContext('2d'), CANVAS_WIDTH, CANVAS_HEIGHT);

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');

startBtn.addEventListener('click', () => {
  const running = game.toggleRunning();
  startBtn.textContent = running ? 'Pause Game' : 'Resume Game';
});

resetBtn.addEventListener('click', () => {
  game.reset();
  syncScoreboard();
});

function syncScoreboard() {
  const { scoreboard } = game.getState();
  playerScoreEl.textContent = scoreboard.player;
  computerScoreEl.textContent = scoreboard.computer;
}

function loop() {
  game.update(input.keys, input.mouseY);
  syncScoreboard();
  renderer.draw(game.getState());
  requestAnimationFrame(loop);
}

loop();
