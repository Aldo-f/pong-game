export function createScoreboard() {
  return { player: 0, computer: 0 };
}

export function pointForPlayer(scoreboard) {
  return { ...scoreboard, player: scoreboard.player + 1 };
}

export function pointForComputer(scoreboard) {
  return { ...scoreboard, computer: scoreboard.computer + 1 };
}
