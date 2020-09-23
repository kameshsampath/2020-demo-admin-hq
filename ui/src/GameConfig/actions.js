export const UPDATE_GAME_STATE = 'GameConfig.UPDATE_GAME_STATE';
export const updateGameState = (state, username, password, gameType) => ({
  type: UPDATE_GAME_STATE,
  payload: { state, username, password, gameType }
});

