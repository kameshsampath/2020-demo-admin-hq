export const RESET_GAME = 'GameStatus.RESET_GAME';
export const resetGame = (username, password, gameType) => ({
  type: RESET_GAME,
  payload: { username, password, gameType }
});

