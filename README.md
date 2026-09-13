# pong-game
A simple Pong game with HTML, CSS, and JavaScript featuring player vs computer gameplay.

## Project structure

Game logic is split into small, pure, independently-tested modules under `src/`,
with a thin DOM layer wiring them to the page:

- `paddle.js`, `ball.js`, `collisions.js`, `ai.js`, `player-input.js`, `scoreboard.js` —
  pure functions with no DOM dependency (all unit tested).
- `game.js` — `Game` class that orchestrates the pure modules into one frame update.
- `input-controller.js` — reads raw keyboard/mouse events into a simple state object.
- `renderer.js` — draws game state to the canvas. Contains no game logic.
- `main.js` — wires everything to `index.html` and runs the animation loop.

## Running the game

Open `index.html` in a browser (or serve the folder with any static server).

## Running the tests

```bash
npm install
npm test
```

