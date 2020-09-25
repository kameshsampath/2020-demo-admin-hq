function getGameStats() {
  const game = global.game;
  if ("gtp" === game.gameType) {
    return {
      game,
      polledLeaderboard: global.polledLeaderboard,
      leaderboard: global.leaderboard,
      edgeStats: global.edgeStats,
      botConfig: global.botConfig
    };
  } else if ("balloon-game" === game.gameType) {
    {
      return {
        game,
        polledLeaderboard: global.polledLeaderboard,
        leaderboard: global.leaderboard,
      };
    }
  } else {
    return {
      game
    }
  }
}

module.exports = getGameStats;