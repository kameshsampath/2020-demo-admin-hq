export const UPDATE_GAME_CONFIG = 'GameConfig.UPDATE_GAME_CONFIG';
export const updateGameConfig = (
  state, username, password, gameType,
  background, speed, size, opacity,
  goldenSnitch1, goldenSnitch2,
  pred, pgreen, pblue, pyellow,
  pgoldenSnitch1, pgoldenSnitch2
) => ({
  type: UPDATE_GAME_CONFIG,
  payload: {
    state,
    username,
    password,
    gameType,
    background,
    speed,
    size,
    opacity,
    goldenSnitch1,
    goldenSnitch2,
    pred,
    pgreen,
    pblue,
    pyellow,
    pgoldenSnitch1,
    pgoldenSnitch2
  }
});

