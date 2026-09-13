export class InputController {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouseY = canvas.height / 2;
    this._keys = { up: false, down: false };

    window.addEventListener('keydown', (e) => this._setKey(e.key, true));
    window.addEventListener('keyup', (e) => this._setKey(e.key, false));
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseY = e.clientY - rect.top;
    });
  }

  get keys() {
    return this._keys;
  }

  _setKey(key, isDown) {
    if (key === 'ArrowUp' || key === 'w' || key === 'W') {
      this._keys.up = isDown;
    } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
      this._keys.down = isDown;
    }
  }
}
